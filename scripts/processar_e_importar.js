const fs = require('fs');
const { execSync } = require('child_process');

// 1. Carrega efetivo do JSON retornado pelo gsheets
console.log('Obtendo efetivo de todo_efetivo...');
const rawEfetivo = execSync('gsheets readonly read 18kLtJLfhy7jijao-VTz1t0lpkpYq00YyuPE_7yVefmA "todo_efetivo!A1:E200" --json', { encoding: 'utf8' });
const dadosEfetivo = JSON.parse(rawEfetivo);

const listaEfetivo = [];
for (let i = 1; i < dadosEfetivo.length; i++) {
  const row = dadosEfetivo[i];
  const grad = String(row[2] || '').trim();
  const nomeGuerra = String(row[4] || '').trim();
  if (!nomeGuerra) continue;
  const gradCurta = grad ? grad.split(' ')[0] : '';
  const exibicao = (gradCurta ? gradCurta + ' ' : '') + nomeGuerra;

  listaEfetivo.push({
    exibicao: exibicao,
    nomeGuerra: nomeGuerra.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  });
}
listaEfetivo.sort((a, b) => b.nomeGuerra.length - a.nomeGuerra.length);
console.log(`Efetivo carregado: ${listaEfetivo.length} policiais.`);

function normalizarNome(nomeBruto) {
  if (!nomeBruto || typeof nomeBruto !== 'string') return '';
  const limpo = nomeBruto.trim();
  if (limpo.length < 3) return '';

  const semAcento = limpo.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  for (let i = 0; i < listaEfetivo.length; i++) {
    const ef = listaEfetivo[i];
    const regex = new RegExp('(?:^|[^A-Z])' + ef.nomeGuerra + '(?:$|[^A-Z])');
    if (regex.test(semAcento)) {
      return ef.exibicao;
    }
  }
  return limpo;
}

// 2. Carrega dados do WhatsApp de CargaHistorica.js
const conteudoCarga = fs.readFileSync('scripts/leitura_assuncao_servico/CargaHistorica.js', 'utf8');
const match = conteudoCarga.match(/const DADOS_HISTORICO_WHATSAPP = (\[[\s\S]*?\]);/);
if (!match) {
  throw new Error('Não foi possível encontrar DADOS_HISTORICO_WHATSAPP em CargaHistorica.js');
}
const dadosHistorico = eval(match[1]);
console.log(`Total de plantões no arquivo: ${dadosHistorico.length}`);

// 3. Monta linhas de Registro_Plantao e Guarnicao_Policial
const cabecalhoPlantao = [
  'ID_Turno', 'Data_Servico', 'Hora_Assuncao', 'Fracao', 'Posto_Equipe', 'Regime',
  'VTR_Placa', 'VTR_Prefixo', 'KM_Inicial', 'Material_Carga', 'Obs_Assuncao',
  'CMT_ou_Titular', 'Motorista', 'Patrulheiro', 'Despachante', 'Telefone_Funcional',
  'KM_Final', 'KM_Rodado', 'Abordagens_Pessoas', 'Abordagens_Veiculos',
  'Autos_Infracao', 'Remocoes_Veiculos', 'Status_Turno', 'Carimbo_Registro'
];

const cabecalhoGuarnicao = [
  'ID_Turno', 'Data_Servico', 'Fracao', 'VTR_Placa', 'Policial', 'Funcao', 'Pontua_Equipe_VTR'
];

function escapeCsv(val) {
  if (val === undefined || val === null) return '';
  const s = String(val);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

const linhasPlantao = [cabecalhoPlantao.map(escapeCsv).join(',')];
const linhasGuarnicao = [cabecalhoGuarnicao.map(escapeCsv).join(',')];

dadosHistorico.forEach(rec => {
  const cmtNorm = normalizarNome(rec.cmt);
  const motNorm = normalizarNome(rec.motorista);
  const patrNorm = normalizarNome(rec.patrulheiro);
  const despNorm = normalizarNome(rec.despachante);

  const partesData = rec.data.split('/');
  const dataLimpa = partesData[2] + partesData[1] + partesData[0];
  const siglaFracao = rec.fracao.split('/')[0].replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  const idTurno = `${dataLimpa}-${siglaFracao}-RP01-WHATSAPP`;

  const linhaP = [
    idTurno,
    rec.data,
    rec.hora || '08:00',
    rec.fracao,
    rec.posto || 'RP 01',
    rec.regime || '24h',
    rec.vtrPlaca || '',
    rec.vtrPrefixo || '',
    rec.kmInicial || 0,
    rec.materialCarga || 'S/A',
    rec.obs || 'Histórico importado do WhatsApp',
    cmtNorm,
    motNorm,
    patrNorm,
    despNorm,
    rec.telefone || '',
    '', 0, 0, 0, 0, 0,
    'Encerrado',
    'Carga Histórica WhatsApp'
  ];
  linhasPlantao.push(linhaP.map(escapeCsv).join(','));

  const equipe = [
    { nome: cmtNorm, funcao: 'Comandante', pontua: 'Sim' },
    { nome: motNorm, funcao: 'Motorista', pontua: 'Sim' },
    { nome: patrNorm, funcao: 'Patrulheiro', pontua: 'Sim' },
    { nome: despNorm, funcao: 'Despachante', pontua: 'Não' }
  ];

  equipe.forEach(m => {
    if (m.nome && m.nome.trim() !== '') {
      const linhaG = [
        idTurno,
        rec.data,
        rec.fracao,
        rec.vtrPlaca || '',
        m.nome.trim(),
        m.funcao,
        m.pontua
      ];
      linhasGuarnicao.push(linhaG.map(escapeCsv).join(','));
    }
  });
});

fs.writeFileSync('Registro_Plantao.csv', linhasPlantao.join('\n'), 'utf8');
fs.writeFileSync('Guarnicao_Policial.csv', linhasGuarnicao.join('\n'), 'utf8');

console.log(`Gerado Registro_Plantao.csv com ${linhasPlantao.length - 1} registros.`);
console.log(`Gerado Guarnicao_Policial.csv com ${linhasGuarnicao.length - 1} registros.`);
