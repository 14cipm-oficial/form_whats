const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = 8000;
const SPREADSHEET_ID = '18kLtJLfhy7jijao-VTz1t0lpkpYq00YyuPE_7yVefmA';

// Carrega efetivo padrão de contingência
let efetivoCompleto = [];
try {
  efetivoCompleto = JSON.parse(fs.readFileSync(path.join(__dirname, 'efetivo_completo.json'), 'utf8'));
} catch (e) {
  console.error('Aviso ao carregar efetivo_completo.json:', e.message);
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function enviarJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

function obterDadosIniciaisPlanilha() {
  const resultado = {
    sucesso: true,
    efetivo: efetivoCompleto,
    turnosAbertos: [],
    kmPorVtr: {},
    equipesPorCmt: {}
  };

  try {
    const rawPlantao = execSync(
      `gsheets readonly read ${SPREADSHEET_ID} "Registro_Plantao!A1:X1000" --json`,
      { encoding: 'utf8', timeout: 15000 }
    );
    const rows = JSON.parse(rawPlantao);

    // Turnos abertos
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      const status = String(r[22] || '').trim();
      if (status === 'Em andamento') {
        resultado.turnosAbertos.push({
          idTurno: String(r[0]),
          data: String(r[1]),
          fracao: String(r[3]),
          posto: String(r[4]),
          vtr: String(r[6]),
          kmInicial: Number(r[8]) || 0,
          cmt: String(r[11] || '')
        });
      }
    }

    // Histórico de KM por VTR e Equipes por CMT (de baixo para cima)
    for (let i = rows.length - 1; i >= 1; i--) {
      const r = rows[i];
      const placa = String(r[6] || '').trim().toUpperCase();
      const kmFinal = Number(r[16]) || 0;
      const kmInicial = Number(r[8]) || 0;
      const kmRef = kmFinal > 0 ? kmFinal : kmInicial;
      if (placa && !resultado.kmPorVtr[placa] && kmRef > 0) {
        resultado.kmPorVtr[placa] = kmRef;
      }
      const cmt = String(r[11] || '').trim();
      if (cmt && !resultado.equipesPorCmt[cmt]) {
        resultado.equipesPorCmt[cmt] = {
          motorista: String(r[12] || '').trim(),
          patrulheiro: String(r[13] || '').trim(),
          despachante: String(r[14] || '').trim()
        };
      }
    }
  } catch (err) {
    console.error('Erro ao ler Registro_Plantao via gsheets:', err.message);
  }

  return resultado;
}

function salvarAssuncaoPlanilha(dados) {
  const lista = (dados.equipes && Array.isArray(dados.equipes) && dados.equipes.length > 0)
    ? dados.equipes
    : [dados];

  const partesData = (dados.data || '').split('-');
  const dataBr = partesData.length === 3 ? `${partesData[2]}/${partesData[1]}/${partesData[0]}` : dados.data;
  
  const agora = new Date();
  const pad = n => String(n).padStart(2, '0');
  const carimbo = `${pad(agora.getDate())}/${pad(agora.getMonth() + 1)}/${agora.getFullYear()} ${pad(agora.getHours())}:${pad(agora.getMinutes())}:${pad(agora.getSeconds())}`;
  const sufixoBase = `${pad(agora.getHours())}${pad(agora.getMinutes())}${pad(agora.getSeconds())}`;

  const batchOps = [];
  const idTurnos = [];

  lista.forEach((eq, idx) => {
    const dataLimpa = (dados.data || '').replace(/-/g, '');
    const siglaFracao = (dados.fracao || eq.fracao || 'SEDE').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    const siglaPosto = (eq.posto || 'EQ').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    const idTurno = eq.idTurnoAtualizar || `${dataLimpa}-${siglaFracao}-${siglaPosto}-${sufixoBase}-${idx + 1}`;
    idTurnos.push(idTurno);

    const linhaPlantao = [
      idTurno,
      dataBr,
      dados.hora || eq.hora || '08:00',
      dados.fracao || eq.fracao || 'Sede',
      eq.posto || 'RP 01',
      dados.regime || eq.regime || '24h',
      (eq.vtrPlaca || '').toUpperCase(),
      eq.vtrPrefixo || '',
      Number(eq.kmInicial) || 0,
      eq.materialCarga || 'S/A',
      eq.obs || '',
      eq.cmt || '',
      eq.motorista || '',
      eq.patrulheiro || '',
      eq.despachante || '',
      dados.telefone || eq.telefone || '',
      '',     // KM_Final
      0,      // KM_Rodado
      0,      // Abordagens_Pessoas
      0,      // Abordagens_Veiculos
      0,      // Autos_Infracao
      0,      // Remocoes_Veiculos
      'Em andamento',
      carimbo
    ];

    batchOps.push({
      op: 'append',
      range: 'Registro_Plantao!A1',
      data: [linhaPlantao]
    });

    // Registros de Guarnição Policial
    const guarnicaoRows = [];
    if (eq.cmt) {
      guarnicaoRows.push([idTurno, dataBr, dados.fracao || eq.fracao || 'Sede', (eq.vtrPlaca || '').toUpperCase(), eq.cmt, 'Comandante', 'Sim']);
    }
    if (eq.motorista) {
      guarnicaoRows.push([idTurno, dataBr, dados.fracao || eq.fracao || 'Sede', (eq.vtrPlaca || '').toUpperCase(), eq.motorista, 'Motorista', 'Sim']);
    }
    if (eq.patrulheiro) {
      guarnicaoRows.push([idTurno, dataBr, dados.fracao || eq.fracao || 'Sede', (eq.vtrPlaca || '').toUpperCase(), eq.patrulheiro, 'Patrulheiro', 'Sim']);
    }
    if (eq.despachante) {
      guarnicaoRows.push([idTurno, dataBr, dados.fracao || eq.fracao || 'Sede', (eq.vtrPlaca || '').toUpperCase(), eq.despachante, 'Despachante', 'Sim']);
    }

    if (guarnicaoRows.length > 0) {
      batchOps.push({
        op: 'append',
        range: 'Guarnicao_Policial!A1',
        data: guarnicaoRows
      });
    }
  });

  const tempFile = path.join(__dirname, `batch_assuncao_${Date.now()}.json`);
  fs.writeFileSync(tempFile, JSON.stringify(batchOps, null, 2), 'utf8');

  try {
    execSync(`gsheets mutate batch ${SPREADSHEET_ID} -f "${tempFile}" --json`, {
      encoding: 'utf8',
      timeout: 20000
    });
    return { sucesso: true, totalEquipes: lista.length, idTurnos: idTurnos };
  } finally {
    if (fs.existsSync(tempFile)) {
      try { fs.unlinkSync(tempFile); } catch(e) {}
    }
  }
}

function salvarEncerramentoPlanilha(dados) {
  const idTurno = dados.idTurno;
  if (!idTurno) throw new Error('ID do turno não informado.');

  const rawPlantao = execSync(
    `gsheets readonly read ${SPREADSHEET_ID} "Registro_Plantao!A1:X1000" --json`,
    { encoding: 'utf8', timeout: 15000 }
  );
  const rows = JSON.parse(rawPlantao);

  let linhaAlvo = -1;
  let kmInicial = 0;
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]).trim() === String(idTurno).trim()) {
      linhaAlvo = i + 1; // 1-based index na planilha
      kmInicial = Number(rows[i][8]) || 0;
      break;
    }
  }

  if (linhaAlvo === -1) {
    throw new Error(`Turno ${idTurno} não encontrado em Registro_Plantao.`);
  }

  const kmFinal = Number(dados.kmFinal) || 0;
  const kmRodado = Math.max(0, kmFinal - kmInicial);

  const agora = new Date();
  const pad = n => String(n).padStart(2, '0');
  const carimbo = `${pad(agora.getDate())}/${pad(agora.getMonth() + 1)}/${agora.getFullYear()} ${pad(agora.getHours())}:${pad(agora.getMinutes())}:${pad(agora.getSeconds())} (Encerramento)`;

  // Colunas Q a X (17 a 24): KM_Final, KM_Rodado, Abordagens_Pessoas, Abordagens_Veiculos, Autos_Infracao, Remocoes_Veiculos, Status_Turno, Carimbo_Registro
  const dadosEncerramento = [[
    kmFinal,
    kmRodado,
    Number(dados.abordagensPessoas) || 0,
    Number(dados.abordagensVeiculos) || 0,
    Number(dados.autosInfracao) || 0,
    Number(dados.remocoesVeiculos) || 0,
    'Encerrado',
    carimbo
  ]];

  const tempFile = path.join(__dirname, `batch_encerramento_${Date.now()}.json`);
  const batchOps = [{
    op: 'write',
    range: `Registro_Plantao!Q${linhaAlvo}:X${linhaAlvo}`,
    data: dadosEncerramento
  }];
  fs.writeFileSync(tempFile, JSON.stringify(batchOps, null, 2), 'utf8');

  try {
    execSync(`gsheets mutate batch ${SPREADSHEET_ID} -f "${tempFile}" --json`, {
      encoding: 'utf8',
      timeout: 20000
    });
    return { sucesso: true, kmRodado: kmRodado };
  } finally {
    if (fs.existsSync(tempFile)) {
      try { fs.unlinkSync(tempFile); } catch(e) {}
    }
  }
}

const server = http.createServer(async (req, res) => {
  // Tratamento de OPTIONS para CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  const urlParsed = req.url.split('?')[0];

  // ── Rotas de API ───────────────────────────────────────────────────────────
  if (urlParsed === '/api/dados-iniciais' && req.method === 'GET') {
    try {
      const dados = obterDadosIniciaisPlanilha();
      enviarJson(res, 200, dados);
    } catch (e) {
      console.error('Erro /api/dados-iniciais:', e);
      enviarJson(res, 500, { sucesso: false, erro: e.message, efetivo: efetivoCompleto });
    }
    return;
  }

  if (urlParsed === '/api/salvar-assuncao' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const resultado = salvarAssuncaoPlanilha(body);
      console.log('✅ Assunção salva com sucesso na planilha via localhost:', resultado);
      enviarJson(res, 200, resultado);
    } catch (e) {
      console.error('❌ Erro ao salvar assunção via localhost:', e);
      enviarJson(res, 500, { sucesso: false, erro: e.message });
    }
    return;
  }

  if (urlParsed === '/api/salvar-encerramento' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const resultado = salvarEncerramentoPlanilha(body);
      console.log('✅ Encerramento salvo com sucesso na planilha via localhost:', resultado);
      enviarJson(res, 200, resultado);
    } catch (e) {
      console.error('❌ Erro ao salvar encerramento via localhost:', e);
      enviarJson(res, 500, { sucesso: false, erro: e.message });
    }
    return;
  }

  // ── Servidor de Arquivos Estáticos ─────────────────────────────────────────
  let filePath = '.' + decodeURIComponent(urlParsed);
  if (filePath === './' || filePath === '.') filePath = './controle_plantao.html';

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Arquivo não encontrado');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Erro interno no servidor: ' + error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Servidor 14ª CIPM rodando com API completa em http://localhost:${PORT}`);
});
