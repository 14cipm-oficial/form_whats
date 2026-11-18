const ID_PLANILHA_CONTROLE = '18kLtJLfhy7jijao-VTz1t0lpkpYq00YyuPE_7yVefmA';
const ABA_EFETIVO = 'todo_efetivo';
const ABA_PLANTAO = 'Registro_Plantao';
const ABA_GUARNICAO = 'Guarnicao_Policial';

function doGet(e) {
  if (e && e.parameter && e.parameter.executarCarga === 'sim') {
    const res = executarCargaHistoricaWhatsApp();
    return HtmlService.createHtmlOutput(
      '<div style="font-family:sans-serif;padding:30px;text-align:center;max-width:600px;margin:auto;">' +
      '<h2 style="color:#134e4a;">✅ Carga Histórica da 14ª CIPM Concluída com Sucesso!</h2>' +
      '<p style="font-size:16px;"><strong>Plantões importados:</strong> ' + res.plantoesImportados + '</p>' +
      '<p style="font-size:16px;"><strong>Registros de guarnição policial:</strong> ' + res.registrosGuarnicao + '</p>' +
      '<p style="color:#666;margin-top:20px;">Todos os registros desde 01/10/2026 foram inseridos nas abas <code>Registro_Plantao</code> e <code>Guarnicao_Policial</code> da planilha oficial.</p>' +
      '</div>'
    ).setTitle('Carga Histórica - 14ª CIPM');
  }

  if (e && e.parameter && e.parameter.padronizar === 'sim') {
    const res = padronizarFracoesPlanilha();
    return HtmlService.createHtmlOutput(
      '<div style="font-family:sans-serif;padding:30px;text-align:center;max-width:600px;margin:auto;">' +
      '<h2 style="color:#134e4a;">✅ Padronização de Frações Concluída!</h2>' +
      '<p style="font-size:16px;"><strong>Linhas de plantão atualizadas:</strong> ' + res.plantaoAlterados + '</p>' +
      '<p style="font-size:16px;"><strong>Linhas de guarnição atualizadas:</strong> ' + res.guarnicaoAlterados + '</p>' +
      '<p style="color:#666;margin-top:20px;">Todas as frações agora utilizam o padrão unificado: Sede, 2° PEL Iguatemi, 3° PEL Japorã, 4° PEL Eldorado e Morumbi.</p>' +
      '</div>'
    ).setTitle('Padronização de Frações - 14ª CIPM');
  }

  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('14ª CIPM - Assunção e Encerramento')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1');
}

function onOpen() {
  try {
    SpreadsheetApp.getUi()
      .createMenu('14ª CIPM')
      .addItem('📥 Importar Histórico WhatsApp (desde 01/10/2026)', 'executarCargaHistoricaWhatsAppMenu')
      .addItem('🔄 Padronizar Frações (Sede, 2° PEL...)', 'padronizarFracoesMenu')
      .addToUi();
  } catch(e) {}
}

function padronizarFracoesMenu() {
  const res = padronizarFracoesPlanilha();
  SpreadsheetApp.getUi().alert(
    'Padronização de Frações Concluída!\n\n' +
    'Plantões atualizados: ' + res.plantaoAlterados + '\n' +
    'Guarnições atualizadas: ' + res.guarnicaoAlterados + '\n\n' +
    'Padrão: Sede, 2° PEL Iguatemi, 3° PEL Japorã, 4° PEL Eldorado, Morumbi.'
  );
}

function padronizarFracoesPlanilha() {
  const ss = obterPlanilha_();
  const mapa = {
    'SEDE / MUNDO NOVO': 'Sede',
    'SEDE – MUNDO NOVO': 'Sede',
    'SEDE - MUNDO NOVO': 'Sede',
    'SEDE': 'Sede',
    '2º PEL / IGUATEMI': '2° PEL Iguatemi',
    '2º PEL – IGUATEMI': '2° PEL Iguatemi',
    '2º PEL - IGUATEMI': '2° PEL Iguatemi',
    '2° PEL / IGUATEMI': '2° PEL Iguatemi',
    '3º PEL / JAPORÃ': '3° PEL Japorã',
    '3º PEL – JAPORÃ': '3° PEL Japorã',
    '3º PEL - JAPORÃ': '3° PEL Japorã',
    '3° PEL / JAPORÃ': '3° PEL Japorã',
    '4º PEL / ELDORADO': '4° PEL Eldorado',
    '4º PEL – ELDORADO': '4° PEL Eldorado',
    '4º PEL - ELDORADO': '4° PEL Eldorado',
    '4° PEL / ELDORADO': '4° PEL Eldorado',
    'GPM / PORTO MORUMBI': 'Morumbi',
    'GPM – PORTO MORUMBI': 'Morumbi',
    'PORTO MORUMBI': 'Morumbi'
  };

  const sheetP = ss.getSheetByName(ABA_PLANTAO);
  let alteradosP = 0;
  if (sheetP && sheetP.getLastRow() > 1) {
    const rangeP = sheetP.getRange(2, 4, sheetP.getLastRow() - 1, 1);
    const valoresP = rangeP.getValues();
    for (let i = 0; i < valoresP.length; i++) {
      const v = String(valoresP[i][0] || '').trim();
      if (mapa[v]) {
        valoresP[i][0] = mapa[v];
        alteradosP++;
      }
    }
    if (alteradosP > 0) rangeP.setValues(valoresP);
  }

  const sheetG = ss.getSheetByName(ABA_GUARNICAO);
  let alteradosG = 0;
  if (sheetG && sheetG.getLastRow() > 1) {
    const rangeG = sheetG.getRange(2, 3, sheetG.getLastRow() - 1, 1);
    const valoresG = rangeG.getValues();
    for (let i = 0; i < valoresG.length; i++) {
      const v = String(valoresG[i][0] || '').trim();
      if (mapa[v]) {
        valoresG[i][0] = mapa[v];
        alteradosG++;
      }
    }
    if (alteradosG > 0) rangeG.setValues(valoresG);
  }

  return { sucesso: true, plantaoAlterados: alteradosP, guarnicaoAlterados: alteradosG };
}

/**
 * Obtém a planilha ativa (quando vinculado) ou abre pelo ID oficial da 14ª CIPM
 */
function obterPlanilha_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss) return ss;
  return SpreadsheetApp.openById(ID_PLANILHA_CONTROLE);
}

function getDadosIniciais() {
  const ss = obterPlanilha_();
  const efetivo = listarEfetivo_(ss);
  const turnosAbertos = listarTurnosAbertos_(ss);
  const historico = obterHistoricoPlantao_(ss);
  return { 
    efetivo: efetivo, 
    turnosAbertos: turnosAbertos,
    kmPorVtr: historico.kmPorVtr,
    equipesPorCmt: historico.equipesPorCmt
  };
}

function listarEfetivo_(ss) {
  const sheet = ss.getSheetByName(ABA_EFETIVO);
  if (!sheet) return [];
  const dados = sheet.getDataRange().getValues();
  const lista = [];

  for (let i = 1; i < dados.length; i++) {
    const grad = String(dados[i][2] || '').trim();
    const cidade = String(dados[i][3] || '').trim().toUpperCase();
    const nomeGuerra = String(dados[i][4] || '').trim();
    if (!nomeGuerra) continue;

    const gradCurta = grad ? grad.split(' ')[0] : '';
    const exibicao = (gradCurta ? gradCurta + ' ' : '') + nomeGuerra;

    lista.push({
      nome: exibicao,
      cidade: cidade
    });
  }

  lista.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  return lista;
}

function listarTurnosAbertos_(ss) {
  const sheet = ss.getSheetByName(ABA_PLANTAO);
  if (!sheet || sheet.getLastRow() < 2) return [];

  const dados = sheet.getDataRange().getValues();
  const abertos = [];

  for (let i = 1; i < dados.length; i++) {
    const status = String(dados[i][22] || '').trim();
    if (status === 'Em andamento') {
      const dataBr = formatarDataCelula_(dados[i][1]);
      abertos.push({
        idTurno: String(dados[i][0]),
        data: dataBr,
        fracao: String(dados[i][3]),
        posto: String(dados[i][4]),
        vtr: String(dados[i][6]),
        kmInicial: Number(dados[i][8]) || 0,
        cmt: String(dados[i][11] || '')
      });
    }
  }
  return abertos.reverse();
}

/**
 * Varre o histórico de plantões para obter o último KM final de cada viatura
 * e a última guarnição registrada com cada comandante
 */
function obterHistoricoPlantao_(ss) {
  const sheet = ss.getSheetByName(ABA_PLANTAO);
  const kmPorVtr = {};
  const equipesPorCmt = {};

  if (!sheet || sheet.getLastRow() < 2) {
    return { kmPorVtr: kmPorVtr, equipesPorCmt: equipesPorCmt };
  }

  const dados = sheet.getDataRange().getValues();
  // Varre de baixo para cima (do mais recente para o mais antigo)
  for (let i = dados.length - 1; i >= 1; i--) {
    const placa = String(dados[i][6] || '').trim().toUpperCase();
    const kmFinal = Number(dados[i][16]) || 0;
    const kmInicial = Number(dados[i][8]) || 0;
    const kmReferencia = kmFinal > 0 ? kmFinal : kmInicial;

    if (placa && !kmPorVtr[placa] && kmReferencia > 0) {
      kmPorVtr[placa] = kmReferencia;
    }

    const cmt = String(dados[i][11] || '').trim();
    if (cmt && !equipesPorCmt[cmt]) {
      equipesPorCmt[cmt] = {
        motorista: String(dados[i][12] || '').trim(),
        patrulheiro: String(dados[i][13] || '').trim(),
        despachante: String(dados[i][14] || '').trim()
      };
    }
  }

  return { kmPorVtr: kmPorVtr, equipesPorCmt: equipesPorCmt };
}

function salvarAssuncao(dados) {
  const ss = obterPlanilha_();
  const sheetPlantao = obterOuCriarAba_(ss, ABA_PLANTAO, [
    'ID_Turno', 'Data_Servico', 'Hora_Assuncao', 'Fracao', 'Posto_Equipe', 'Regime',
    'VTR_Placa', 'VTR_Prefixo', 'KM_Inicial', 'Material_Carga', 'Obs_Assuncao',
    'CMT_ou_Titular', 'Motorista', 'Patrulheiro', 'Despachante', 'Telefone_Funcional',
    'KM_Final', 'KM_Rodado', 'Abordagens_Pessoas', 'Abordagens_Veiculos',
    'Autos_Infracao', 'Remocoes_Veiculos', 'Status_Turno', 'Carimbo_Registro'
  ]);

  const sheetGuarnicao = obterOuCriarAba_(ss, ABA_GUARNICAO, [
    'ID_Turno', 'Data_Servico', 'Fracao', 'VTR_Placa', 'Policial', 'Funcao', 'Pontua_Equipe_VTR'
  ]);

  const partesData = dados.data.split('-');
  const dataBr = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;
  const carimbo = Utilities.formatDate(new Date(), 'America/Campo_Grande', 'dd/MM/yyyy HH:mm:ss');

  let idTurno = dados.idTurnoAtualizar;
  let linhaPlantaoAlvo = -1;

  if (idTurno && sheetPlantao.getLastRow() > 1) {
    const valoresPlantao = sheetPlantao.getDataRange().getValues();
    for (let i = 1; i < valoresPlantao.length; i++) {
      if (String(valoresPlantao[i][0]) === String(idTurno)) {
        linhaPlantaoAlvo = i + 1;
        break;
      }
    }
  }

  if (linhaPlantaoAlvo > -1) {
    // ATUALIZAÇÃO DA LINHA EXISTENTE NA PLANILHA
    sheetPlantao.getRange(linhaPlantaoAlvo, 2, 1, 15).setValues([[
      dataBr,
      dados.hora,
      dados.fracao,
      dados.posto,
      dados.regime,
      (dados.vtrPlaca || '').toUpperCase(),
      dados.vtrPrefixo || '',
      Number(dados.kmInicial) || 0,
      dados.materialCarga || 'S/A',
      dados.obs || '',
      dados.cmt || '',
      dados.motorista || '',
      dados.patrulheiro || '',
      dados.despachante || '',
      dados.telefone || ''
    ]]);
    sheetPlantao.getRange(linhaPlantaoAlvo, 24).setValue(carimbo + ' (Atualizado)');

    // Remove registros antigos desta guarnição para reinserir atualizados
    if (sheetGuarnicao.getLastRow() > 1) {
      const valoresG = sheetGuarnicao.getDataRange().getValues();
      for (let i = valoresG.length - 1; i >= 1; i--) {
        if (String(valoresG[i][0]) === String(idTurno)) {
          sheetGuarnicao.deleteRow(i + 1);
        }
      }
    }
  } else {
    // NOVO REGISTRO
    const dataLimpa = dados.data.replace(/-/g, '');
    const siglaFracao = dados.fracao.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    const siglaPosto = dados.posto.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    const sufixo = Utilities.formatDate(new Date(), 'America/Campo_Grande', 'HHmmss');
    idTurno = `${dataLimpa}-${siglaFracao}-${siglaPosto}-${sufixo}`;

    sheetPlantao.appendRow([
      idTurno,
      dataBr,
      dados.hora,
      dados.fracao,
      dados.posto,
      dados.regime,
      (dados.vtrPlaca || '').toUpperCase(),
      dados.vtrPrefixo || '',
      Number(dados.kmInicial) || 0,
      dados.materialCarga || 'S/A',
      dados.obs || '',
      dados.cmt || '',
      dados.motorista || '',
      dados.patrulheiro || '',
      dados.despachante || '',
      dados.telefone || '',
      '', '', '', '', '', '',
      'Em andamento',
      carimbo
    ]);
  }

  const equipe = [
    { nome: dados.cmt, funcao: 'Comandante' },
    { nome: dados.motorista, funcao: 'Motorista' },
    { nome: dados.patrulheiro, funcao: 'Patrulheiro' },
    { nome: dados.despachante, funcao: 'Despachante' }
  ];

  const postosSemVtr = ['CFP', 'Auxiliar do CFP', 'Rádio Operador'];
  const pontuaVtr = postosSemVtr.includes(dados.posto) ? 'Não' : 'Sim';

  const linhasGuarnicao = [];
  equipe.forEach(membro => {
    if (membro.nome && membro.nome.trim() !== '') {
      linhasGuarnicao.push([
        idTurno,
        dataBr,
        dados.fracao,
        (dados.vtrPlaca || '').toUpperCase(),
        membro.nome.trim(),
        membro.funcao,
        pontuaVtr
      ]);
    }
  });

  if (linhasGuarnicao.length > 0) {
    sheetGuarnicao
      .getRange(sheetGuarnicao.getLastRow() + 1, 1, linhasGuarnicao.length, 7)
      .setValues(linhasGuarnicao);
  }

  return { sucesso: true, idTurno: idTurno, dataBr: dataBr, atualizado: (linhaPlantaoAlvo > -1) };
}

function salvarEncerramento(dados) {
  const ss = obterPlanilha_();
  const sheet = ss.getSheetByName(ABA_PLANTAO);
  if (!sheet) throw new Error('Aba Registro_Plantao não encontrada.');

  const valores = sheet.getDataRange().getValues();
  let linhaAlvo = -1;

  for (let i = 1; i < valores.length; i++) {
    if (String(valores[i][0]) === String(dados.idTurno)) {
      linhaAlvo = i + 1;
      break;
    }
  }

  if (linhaAlvo === -1) {
    throw new Error('Turno não encontrado na planilha.');
  }

  const kmInicial = Number(valores[linhaAlvo - 1][8]) || 0;
  const kmFinal = Number(dados.kmFinal) || 0;
  const kmRodado = kmFinal >= kmInicial ? (kmFinal - kmInicial) : 0;

  sheet.getRange(linhaAlvo, 17, 1, 7).setValues([[
    kmFinal,
    kmRodado,
    Number(dados.abordagensPessoas) || 0,
    Number(dados.abordagensVeiculos) || 0,
    Number(dados.autosInfracao) || 0,
    Number(dados.remocoesVeiculos) || 0,
    'Encerrado'
  ]]);

  return { sucesso: true, kmRodado: kmRodado };
}

function obterOuCriarAba_(ss, nome, cabecalhos) {
  let sheet = ss.getSheetByName(nome);
  if (!sheet) {
    sheet = ss.insertSheet(nome);
    sheet.appendRow(cabecalhos);
  }
  return sheet;
}

function formatarDataCelula_(valor) {
  if (valor instanceof Date) {
    return Utilities.formatDate(valor, 'America/Campo_Grande', 'dd/MM/yyyy');
  }
  return String(valor || '');
}
