const ID_PLANILHA_CONTROLE = '18kLtJLfhy7jijao-VTz1t0lpkpYq00YyuPE_7yVefmA';
const ABA_EFETIVO = 'todo_efetivo';
const ABA_PLANTAO = 'Registro_Plantao';
const ABA_GUARNICAO = 'Guarnicao_Policial';

// Base oficial completa de contingência (77 Policiais)
const EFETIVO_OFICIAL_PADRAO = [
  {
    "nome": "1SGT ALEXANDER",
    "nomeGuerra": "ALEXANDER",
    "nomeCompleto": "ALEXANDER BATISTA",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 9294-8635"
  },
  {
    "nome": "1SGT DIAS",
    "nomeGuerra": "DIAS",
    "nomeCompleto": "CLAUDEMIR JOSE DIAS",
    "cidade": "JAPORA",
    "telefone": "(67) 8167-8237"
  },
  {
    "nome": "1SGT EDSON SILVA",
    "nomeGuerra": "EDSON SILVA",
    "nomeCompleto": "EDSON DA SILVA SANTOS",
    "cidade": "IGUATEMI",
    "telefone": "(67) 99281-4774"
  },
  {
    "nome": "1SGT LUCIANO",
    "nomeGuerra": "LUCIANO",
    "nomeCompleto": "LUCIANO DALCIR URBANSKI WAYHS",
    "cidade": "IGUATEMI",
    "telefone": "(67) 9220-0738"
  },
  {
    "nome": "1SGT RAMALHO",
    "nomeGuerra": "RAMALHO",
    "nomeCompleto": "NATAL CESAR DE LIMA RAMALHO",
    "cidade": "JAPORA",
    "telefone": "(67) 9200-5312"
  },
  {
    "nome": "1TEN BENEDITO",
    "nomeGuerra": "BENEDITO",
    "nomeCompleto": "LUCAS BENEDITO DE OLIVEIRA DA SILVA",
    "cidade": "JAPORA",
    "telefone": "(67) 99112-2839"
  },
  {
    "nome": "2SGT APARECIDO",
    "nomeGuerra": "APARECIDO",
    "nomeCompleto": "APARECIDO FERREIRA DA SILVA",
    "cidade": "ELDORADO",
    "telefone": "(67) 99848-5300"
  },
  {
    "nome": "2SGT CARLOS",
    "nomeGuerra": "CARLOS",
    "nomeCompleto": "CARLOS DOS SANTOS",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 99303-7229"
  },
  {
    "nome": "2SGT CARLOS SILVA",
    "nomeGuerra": "CARLOS SILVA",
    "nomeCompleto": "CARLOS DA SILVA",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 99687-4018"
  },
  {
    "nome": "2SGT LEAL",
    "nomeGuerra": "LEAL",
    "nomeCompleto": "MARCOS LEAL DA SILVA",
    "cidade": "PORTO MORUMBI",
    "telefone": "(67) 99601-5327"
  },
  {
    "nome": "2SGT MARCOS",
    "nomeGuerra": "MARCOS",
    "nomeCompleto": "MARCOS ROBERTO BIANCHINI",
    "cidade": "JAPORA",
    "telefone": "(67) 98218-1857"
  },
  {
    "nome": "2SGT OSVALDO",
    "nomeGuerra": "OSVALDO",
    "nomeCompleto": "OSVALDO COELHO NUNES",
    "cidade": "JAPORA",
    "telefone": "(67) 98128-5654"
  },
  {
    "nome": "2SGT PIETROBELLI",
    "nomeGuerra": "PIETROBELLI",
    "nomeCompleto": "GICYLAU PIETROBELLI",
    "cidade": "JAPORA",
    "telefone": "(67) 98140-1871"
  },
  {
    "nome": "2SGT VALE",
    "nomeGuerra": "VALE",
    "nomeCompleto": "ROBERTO CARLOS VALE",
    "cidade": "ELDORADO",
    "telefone": "(67) 99149-3063"
  },
  {
    "nome": "2TEN ALEX JHONNY",
    "nomeGuerra": "ALEX JHONNY",
    "nomeCompleto": "ALEX JHONNY DA SILVA",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 99137-4000"
  },
  {
    "nome": "3SGT AIRAN",
    "nomeGuerra": "AIRAN",
    "nomeCompleto": "AIRAN AMARAL RODRIGUES",
    "cidade": "ELDORADO",
    "telefone": "(67) 9219-0418"
  },
  {
    "nome": "3SGT EMERSON",
    "nomeGuerra": "EMERSON",
    "nomeCompleto": "ALESSANDRO EMERSON COELHO DOS SANTOS",
    "cidade": "IGUATEMI",
    "telefone": "(67) 99187-6896"
  },
  {
    "nome": "3SGT IVAN",
    "nomeGuerra": "IVAN",
    "nomeCompleto": "IVAN DOS SANTOS SOUZA",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 99213-0116"
  },
  {
    "nome": "3SGT MACIEL",
    "nomeGuerra": "MACIEL",
    "nomeCompleto": "WELVIS PEREIRA MACIEL",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 99343-8786"
  },
  {
    "nome": "3SGT MAKOTO",
    "nomeGuerra": "MAKOTO",
    "nomeCompleto": "MARIO JUNIOR MAKOTO SATO",
    "cidade": "MUNDO NOVO",
    "telefone": "(44) 9143-4856"
  },
  {
    "nome": "3SGT PAULO MARCOS",
    "nomeGuerra": "PAULO MARCOS",
    "nomeCompleto": "PAULO MARCOS ROSA DOS SANTOS",
    "cidade": "IGUATEMI",
    "telefone": "(67) 9627-5100"
  },
  {
    "nome": "3SGT SAMUEL",
    "nomeGuerra": "SAMUEL",
    "nomeCompleto": "SAMUEL PEREIRA",
    "cidade": "IGUATEMI",
    "telefone": "(67) 99601-5327"
  },
  {
    "nome": "3SGT VALDECIR",
    "nomeGuerra": "VALDECIR",
    "nomeCompleto": "VALDECIR PINHEIRO ALVES",
    "cidade": "ELDORADO",
    "telefone": "(44) 9829-4535"
  },
  {
    "nome": "3SGT VIDIGAL",
    "nomeGuerra": "VIDIGAL",
    "nomeCompleto": "ALESSANDRO VIDIGAL DOS SANTOS",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 9286-7933"
  },
  {
    "nome": "CAP FELIZOLA",
    "nomeGuerra": "FELIZOLA",
    "nomeCompleto": "WILSON BARBOSA FELIZOLA",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 99896-2540"
  },
  {
    "nome": "CAP NEURI",
    "nomeGuerra": "NEURI",
    "nomeCompleto": "NEURI LUIZ ROSENI",
    "cidade": "IGUATEMI",
    "telefone": "(67) 99120-7582"
  },
  {
    "nome": "CAP NEURI",
    "nomeGuerra": "NEURI",
    "nomeCompleto": "NEURI LUIZ ROSENI",
    "cidade": "IGUATEMI",
    "telefone": "(67) 99120-7582"
  },
  {
    "nome": "CB BELMIRO",
    "nomeGuerra": "BELMIRO",
    "nomeCompleto": "REGINALDO BELMIRO MENDES",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 8114-4715"
  },
  {
    "nome": "CB BORGES",
    "nomeGuerra": "BORGES",
    "nomeCompleto": "JHONATAN CARLOS CARNEIRO BORGES",
    "cidade": "IGUATEMI",
    "telefone": "(67) 9632-8188"
  },
  {
    "nome": "CB CANDIDO",
    "nomeGuerra": "CANDIDO",
    "nomeCompleto": "DENIS CANDIDO DE OLIVEIRA",
    "cidade": "ELDORADO",
    "telefone": "(67) 8403-4480"
  },
  {
    "nome": "CB CARINA",
    "nomeGuerra": "CARINA",
    "nomeCompleto": "CARINA MAYARA CESARE",
    "cidade": "ELDORADO",
    "telefone": "(67) 99281-6966"
  },
  {
    "nome": "CB CARVALHO",
    "nomeGuerra": "CARVALHO",
    "nomeCompleto": "GEBERSON BONIFACIO DE CARVALHO",
    "cidade": "IGUATEMI",
    "telefone": "(67) 99625-4621"
  },
  {
    "nome": "CB CASSIO",
    "nomeGuerra": "CASSIO",
    "nomeCompleto": "BRUNO CASSIO PINHEIRO DOS SANTOS",
    "cidade": "IGUATEMI",
    "telefone": "(67) 99950-2181"
  },
  {
    "nome": "CB CASTILHO",
    "nomeGuerra": "CASTILHO",
    "nomeCompleto": "CARLOS HENRIQUE CASTILHO DE LIMA MEDEIROS",
    "cidade": "IGUATEMI",
    "telefone": "(67) 99335-9214"
  },
  {
    "nome": "CB CLAUDIO LOPES",
    "nomeGuerra": "CLAUDIO LOPES",
    "nomeCompleto": "CLAUDIO DE SOUZA LOPES",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 9238-3799"
  },
  {
    "nome": "CB DAYANE",
    "nomeGuerra": "DAYANE",
    "nomeCompleto": "DAYANE MADEIRA FONTES",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 9630-7747"
  },
  {
    "nome": "CB DE SOUZA",
    "nomeGuerra": "DE SOUZA",
    "nomeCompleto": "LEANDRO DE SOUZA",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 99121-4808"
  },
  {
    "nome": "CB DENYS",
    "nomeGuerra": "DENYS",
    "nomeCompleto": "DENYS RAFAEL FRANCISCO PHELIPPE HAVEROTH",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 99196-3884"
  },
  {
    "nome": "CB E MARTINS",
    "nomeGuerra": "E MARTINS",
    "nomeCompleto": "EDUARDO BACHEGA MARTINS",
    "cidade": "MUNDO NOVO",
    "telefone": "(44) 99842-7083"
  },
  {
    "nome": "CB EDGAR",
    "nomeGuerra": "EDGAR",
    "nomeCompleto": "EDGAR BACHEGA MARTINS",
    "cidade": "ELDORADO",
    "telefone": "(44) 99828-6576"
  },
  {
    "nome": "CB EMERSON",
    "nomeGuerra": "EMERSON",
    "nomeCompleto": "EMERSON ROMARIO SENE PORTEIRO",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 99257-1239"
  },
  {
    "nome": "CB FERNANDO",
    "nomeGuerra": "FERNANDO",
    "nomeCompleto": "NIJEUDO FERNANDO ACOSTA DA SILVA",
    "cidade": "IGUATEMI",
    "telefone": "(67) 97400-7458"
  },
  {
    "nome": "CB MAICON",
    "nomeGuerra": "MAICON",
    "nomeCompleto": "MAICON BATISTA SILVA",
    "cidade": "IGUATEMI",
    "telefone": "(67) 99618-2125"
  },
  {
    "nome": "CB NATALICIO",
    "nomeGuerra": "NATALICIO",
    "nomeCompleto": "EDERSON NATALICIO MARSCHNER",
    "cidade": "MUNDO NOVO",
    "telefone": "(45) 93300-5837"
  },
  {
    "nome": "CB NOVAES",
    "nomeGuerra": "NOVAES",
    "nomeCompleto": "JEFFERSON NOVAES DA SILVA",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 99104-9582"
  },
  {
    "nome": "CB PEREIRA",
    "nomeGuerra": "PEREIRA",
    "nomeCompleto": "LEANDRO PAVAO PEREIRA DIAS",
    "cidade": "IGUATEMI",
    "telefone": "(67) 99155-0791"
  },
  {
    "nome": "CB UELTON",
    "nomeGuerra": "UELTON",
    "nomeCompleto": "UELTON FRANCA OLIVEIRA",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 99866-8343"
  },
  {
    "nome": "CB WILLIAN",
    "nomeGuerra": "WILLIAN",
    "nomeCompleto": "WILLIAN MORIS BACCIN",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 99161-1688"
  },
  {
    "nome": "MAJ CAMARGO",
    "nomeGuerra": "CAMARGO",
    "nomeCompleto": "GESSÉ CAMARGO JÚNIOR",
    "cidade": "CPA 4",
    "telefone": "(67) 98473-2035"
  },
  {
    "nome": "MAJOR PECHEFIST",
    "nomeGuerra": "PECHEFIST",
    "nomeCompleto": "ADRIANO PECHEFIST",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 99343-1853"
  },
  {
    "nome": "SD ADRIANO",
    "nomeGuerra": "ADRIANO",
    "nomeCompleto": "ADRIANO GONÇALVES LEITE",
    "cidade": "ELDORADO",
    "telefone": "(44) 8837-0729"
  },
  {
    "nome": "SD ALISSON",
    "nomeGuerra": "ALISSON",
    "nomeCompleto": "ALISSON FERNANDO DOS SANTOS",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 99113-0188"
  },
  {
    "nome": "SD ALMEIDA",
    "nomeGuerra": "ALMEIDA",
    "nomeCompleto": "BRUNO DOS SANTOS ALMEIDA",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 99171-6666"
  },
  {
    "nome": "SD BRUNO",
    "nomeGuerra": "BRUNO",
    "nomeCompleto": "BRUNO DA SILVA MACHADO",
    "cidade": "ELDORADO",
    "telefone": "(67) 9824-8774"
  },
  {
    "nome": "SD D BRITO",
    "nomeGuerra": "D BRITO",
    "nomeCompleto": "DOUGLAS BRITO DE OLIVEIRA",
    "cidade": "ELDORADO",
    "telefone": "(67) 99921-3262"
  },
  {
    "nome": "SD DIAS",
    "nomeGuerra": "DIAS",
    "nomeCompleto": "WILLIAN COSTA DIAS",
    "cidade": "IGUATEMI",
    "telefone": "(67) 99636-7840"
  },
  {
    "nome": "SD EDLENE",
    "nomeGuerra": "EDLENE",
    "nomeCompleto": "EDLENE DE SOUZA HAVEROTH",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 99234-6493"
  },
  {
    "nome": "SD EDUARDO",
    "nomeGuerra": "EDUARDO",
    "nomeCompleto": "EDUARDO DE SOUZA LOPES",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 99943-5562"
  },
  {
    "nome": "SD FLAVIO",
    "nomeGuerra": "FLAVIO",
    "nomeCompleto": "FLAVIO ALVES RIBEIRO",
    "cidade": "IGUATEMI",
    "telefone": "(67) 98130-7971"
  },
  {
    "nome": "SD HELLEN",
    "nomeGuerra": "HELLEN",
    "nomeCompleto": "HELLEN LORRAINE ROCHA FRANÇA",
    "cidade": "ELDORADO",
    "telefone": "(67) 99618-0446"
  },
  {
    "nome": "SD JOAO REIS",
    "nomeGuerra": "JOAO REIS",
    "nomeCompleto": "JOAO VICTOR RAMALHO REIS",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 9257-3425"
  },
  {
    "nome": "SD LEANDRO",
    "nomeGuerra": "LEANDRO",
    "nomeCompleto": "LEANDRO BRUNO DA SILVA DOS SANTOS",
    "cidade": "ELDORADO",
    "telefone": "(44) 8860-0642"
  },
  {
    "nome": "SD M.MEDEIROS",
    "nomeGuerra": "M.MEDEIROS",
    "nomeCompleto": "MURILO HENRIQUE MEDEIROS ROSA",
    "cidade": "PORTO MORUMBI",
    "telefone": "(67) 98475-1953"
  },
  {
    "nome": "SD MATTHEUS",
    "nomeGuerra": "MATTHEUS",
    "nomeCompleto": "MATTHEUS ROCHA LEITE",
    "cidade": "ELDORADO",
    "telefone": "(67) 8433-7747"
  },
  {
    "nome": "SD MONTANINI",
    "nomeGuerra": "MONTANINI",
    "nomeCompleto": "VINICIUS MUNIZ MONTANINI",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 99862-2674"
  },
  {
    "nome": "SD MORAES NETO",
    "nomeGuerra": "MORAES NETO",
    "nomeCompleto": "ELISEO BRITES DE MORAES NETO",
    "cidade": "IGUATEMI",
    "telefone": "(45) 99851-5329"
  },
  {
    "nome": "SD SULIANO",
    "nomeGuerra": "SULIANO",
    "nomeCompleto": "VANDER LUIS SULIANO DOS SANTOS",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 98207-1380"
  },
  {
    "nome": "SD TALITA",
    "nomeGuerra": "TALITA",
    "nomeCompleto": "TALITA CARLA NORBERTO",
    "cidade": "ELDORADO",
    "telefone": "(44) 98803-8331"
  },
  {
    "nome": "SD TIBER",
    "nomeGuerra": "TIBER",
    "nomeCompleto": "ANTONIO CARLOS TIBER",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 98100-2902"
  },
  {
    "nome": "SD ZART",
    "nomeGuerra": "ZART",
    "nomeCompleto": "CRISTYANN ADRIANO ZART",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 99941-0251"
  },
  {
    "nome": "ST ANDRE",
    "nomeGuerra": "ANDRE",
    "nomeCompleto": "LUCIMAR ALMEIDA ANDRE",
    "cidade": "JAPORA",
    "telefone": "(67) 9299-0266"
  },
  {
    "nome": "ST CLAUDIO",
    "nomeGuerra": "CLAUDIO",
    "nomeCompleto": "CLAUDIO JAIR GUCKERT",
    "cidade": "IGUATEMI",
    "telefone": "(67) 9878-4513"
  },
  {
    "nome": "ST CLAUDIO",
    "nomeGuerra": "CLAUDIO",
    "nomeCompleto": "CLAUDIO JODIVAN CAVALCANTE",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 99228-0417"
  },
  {
    "nome": "ST DE SOUZA",
    "nomeGuerra": "DE SOUZA",
    "nomeCompleto": "REGINALDO PEREIRA DE SOUZA",
    "cidade": "ELDORADO",
    "telefone": "(67) 99846-5607"
  },
  {
    "nome": "ST GIMENES",
    "nomeGuerra": "GIMENES",
    "nomeCompleto": "EDSON GIMENES",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 99281-4774"
  },
  {
    "nome": "ST NILSON",
    "nomeGuerra": "NILSON",
    "nomeCompleto": "NILSON OTAVIANO DA SILVA",
    "cidade": "MUNDO NOVO",
    "telefone": "(67) 9278-6960"
  },
  {
    "nome": "ST OLIVEIRA",
    "nomeGuerra": "OLIVEIRA",
    "nomeCompleto": "ANTONIO DE OLIVEIRA",
    "cidade": "ELDORADO",
    "telefone": "(67) 99946-7840"
  }
];

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

    if (e && e.parameter && e.parameter.acao === 'getDadosIniciais') {
    const res = getDadosIniciais();
    return ContentService.createTextOutput(JSON.stringify(res))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('14ª CIPM - Assunção e Encerramento')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  try {
    let body = {};
    if (e && e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    }
    const acao = body.acao || (e && e.parameter && e.parameter.acao);

    if (acao === 'salvarAssuncao' || body.equipes) {
      const res = salvarAssuncao(body);
      return ContentService.createTextOutput(JSON.stringify(res))
        .setMimeType(ContentService.MimeType.JSON);
    } else if (acao === 'salvarEncerramento') {
      const res = salvarEncerramento(body);
      return ContentService.createTextOutput(JSON.stringify(res))
        .setMimeType(ContentService.MimeType.JSON);
    } else if (acao === 'getDadosIniciais') {
      const res = getDadosIniciais();
      return ContentService.createTextOutput(JSON.stringify(res))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({ sucesso: false, erro: 'Ação não reconhecida' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ sucesso: false, erro: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
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
  try {
    const ativa = SpreadsheetApp.getActiveSpreadsheet();
    if (ativa && ativa.getId() === ID_PLANILHA_CONTROLE) return ativa;
  } catch(e) {}
  return SpreadsheetApp.openById(ID_PLANILHA_CONTROLE);
}

function getDadosIniciais() {
  try {
    const ss = obterPlanilha_();
    const efetivo = listarEfetivo_(ss);
    const turnosAbertos = listarTurnosAbertos_(ss);
    const historico = obterHistoricoPlantao_(ss);
    return { 
      sucesso: true,
      efetivo: (efetivo && efetivo.length >= 10) ? efetivo : EFETIVO_OFICIAL_PADRAO, 
      turnosAbertos: turnosAbertos || [],
      kmPorVtr: (historico && historico.kmPorVtr) || {},
      equipesPorCmt: (historico && historico.equipesPorCmt) || {}
    };
  } catch (err) {
    Logger.log('Erro em getDadosIniciais: ' + err.toString());
    return {
      sucesso: false,
      erro: err.toString(),
      efetivo: EFETIVO_OFICIAL_PADRAO,
      turnosAbertos: [],
      kmPorVtr: {},
      equipesPorCmt: {}
    };
  }
}

function formatarTelefone_(tel) {
  if (tel === null || tel === undefined || tel === '') return '';
  let str = (typeof tel === 'number') ? tel.toFixed(0) : String(tel).trim();
  const limpo = str.replace(/\D/g, '');
  if (limpo.length === 11) {
    return '(' + limpo.slice(0, 2) + ') ' + limpo.slice(2, 7) + '-' + limpo.slice(7);
  } else if (limpo.length === 10) {
    return '(' + limpo.slice(0, 2) + ') ' + limpo.slice(2, 6) + '-' + limpo.slice(6);
  }
  return str;
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
    const nomeCompleto = String(dados[i][5] || '').trim();
    const telefone = dados[i][8];
    if (!nomeGuerra && !nomeCompleto) continue;

    const gradCurta = grad ? grad.split(' ')[0] : '';
    const exibicao = (gradCurta ? gradCurta + ' ' : '') + (nomeGuerra || nomeCompleto);

    lista.push({
      nome: exibicao,
      nomeGuerra: nomeGuerra,
      nomeCompleto: nomeCompleto,
      cidade: cidade,
      telefone: formatarTelefone_(telefone)
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

  const lista = (dados.equipes && Array.isArray(dados.equipes) && dados.equipes.length > 0)
    ? dados.equipes
    : [dados];

  const resultados = [];
  lista.forEach(function (eq, idx) {
    const item = {
      data:             dados.data || eq.data,
      hora:             dados.hora || eq.hora,
      fracao:           dados.fracao || eq.fracao,
      regime:           dados.regime || eq.regime,
      telefone:         dados.telefone || eq.telefone,
      idTurnoAtualizar: eq.idTurnoAtualizar || null,
      posto:            eq.posto,
      vtrPlaca:         eq.vtrPlaca,
      vtrPrefixo:       eq.vtrPrefixo,
      kmInicial:        eq.kmInicial,
      materialCarga:    eq.materialCarga,
      obs:              eq.obs,
      cmt:              eq.cmt,
      motorista:        eq.motorista,
      patrulheiro:      eq.patrulheiro,
      despachante:      eq.despachante
    };
    resultados.push(salvarUmaEquipeAssuncao_(ss, sheetPlantao, sheetGuarnicao, item));
  });

  return {
    sucesso: true,
    totalEquipes: resultados.length,
    resultados: resultados,
    idTurnos: resultados.map(function (r) { return r.idTurno; }),
    idTurno: resultados[0] ? resultados[0].idTurno : null,
    atualizado: resultados.some(function (r) { return r.atualizado; })
  };
}

function salvarUmaEquipeAssuncao_(ss, sheetPlantao, sheetGuarnicao, dados) {
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
    const siglaPosto = (dados.posto || 'EQ').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    const sufixo = Utilities.formatDate(new Date(), 'America/Campo_Grande', 'HHmmss') + '-' + Math.floor(Math.random() * 900 + 100);
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

  return { idTurno: idTurno, dataBr: dataBr, atualizado: (linhaPlantaoAlvo > -1) };
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
