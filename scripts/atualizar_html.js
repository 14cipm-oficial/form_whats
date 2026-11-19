const fs = require('fs');

const efetivoCompleto = JSON.parse(fs.readFileSync('efetivo_completo.json', 'utf8'));

let html = fs.readFileSync('controle_plantao.html', 'utf8');

// 1. Inserir container de equipes adicionadas antes de #secaoEquipe
const alvoSecaoEquipe = '<!-- Bloco Equipe (RP 01, RP 02, Cadastrar Equipe...) + Regime -->';
const containerEquipesHtml = `<!-- Card de Equipes Adicionadas nesta Assunção -->
          <div id="containerEquipesAdicionadas" class="hidden mb-3 bg-blue-50/90 border border-blue-200 rounded-lg p-3 shadow-sm">
            <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-blue-200">
              <span class="text-xs font-bold text-pm-marinho uppercase tracking-wider flex items-center gap-1.5">
                <span>📋 Equipes Adicionadas</span>
                <span id="badgeQtdEquipes" class="bg-blue-700 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">0</span>
              </span>
              <span class="text-[11px] text-blue-800 font-semibold">Serão enviadas juntas no WhatsApp</span>
            </div>
            <div id="listaCardsEquipes" class="space-y-1.5"></div>
          </div>

          `;

if (!html.includes('id="containerEquipesAdicionadas"')) {
  html = html.replace(alvoSecaoEquipe, containerEquipesHtml + alvoSecaoEquipe);
}

// 2. Atualizar botões pré e pós-salvamento
const alvoBotoes = `        <!-- BOTÃO INICIAL: Salvar -->
        <button type="button" id="btnSalvarAssuncao"
          onclick="enviarAssuncao()"
          class="w-full py-4 bg-pm-marinho text-white font-extrabold rounded-lg shadow-lg hover:bg-slate-800 transition-all text-base tracking-wide uppercase flex items-center justify-center gap-2">
          💾 Salvar
        </button>

        <!-- CONTAINER APÓS SALVAR: TRANSFORMAÇÃO EM 4 BOTÕES -->
        <div id="resultadoAssuncao" class="hidden space-y-3">
          <div id="bannerStatusAssuncao" class="banner-ok">✅ Equipe salva com sucesso na planilha!</div>

          <!-- BOTÃO 1: Adicionar equipe na mesma OPM -->
          <button type="button" id="btnNovaEquipeMesmaOpm" onclick="adicionarEquipeMesmaOpm()"
            class="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-extrabold rounded-lg shadow-md transition-all text-sm uppercase tracking-wide flex items-center justify-center gap-2">
            ➕ Adicionar Equipe na Mesma OPM
          </button>

          <!-- BOTÃO 2: ATUALIZAR (editar a equipe que acabou de salvar) -->
          <button type="button" id="btnAtualizarEquipe" onclick="atualizarEquipeAtual()"
            class="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-lg shadow-md transition-all text-sm uppercase tracking-wide flex items-center justify-center gap-2">
            🔄 ATUALIZAR
          </button>`;

const novosBotoes = `        <!-- BOTÕES PRÉ-SALVAMENTO (Visíveis antes de salvar) -->
        <div id="containerBotoesPreSalvar" class="space-y-2.5">
          <!-- BOTÃO: Adicionar outra Equipe -->
          <button type="button" id="btnAdicionarOutraEquipe"
            onclick="adicionarOutraEquipe()"
            class="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-extrabold rounded-lg shadow-md transition-all text-sm uppercase tracking-wide flex items-center justify-center gap-2 border border-blue-900">
            ➕ Adicionar outra Equipe
          </button>

          <!-- BOTÃO: Salvar Assunção -->
          <button type="button" id="btnSalvarAssuncao"
            onclick="salvarTodasEquipes()"
            class="w-full py-4 bg-pm-marinho text-white font-extrabold rounded-lg shadow-lg hover:bg-slate-800 transition-all text-base tracking-wide uppercase flex items-center justify-center gap-2">
            💾 Salvar Assunção
          </button>
        </div>

        <!-- CONTAINER APÓS SALVAR: AÇÕES FINAIS -->
        <div id="resultadoAssuncao" class="hidden space-y-3">
          <div id="bannerStatusAssuncao" class="banner-ok">✅ Equipe salva com sucesso na planilha!</div>

          <!-- BOTÃO 1: Adicionar outra Equipe -->
          <button type="button" id="btnNovaEquipeMesmaOpm" onclick="adicionarOutraEquipePosSalvar()"
            class="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-extrabold rounded-lg shadow-md transition-all text-sm uppercase tracking-wide flex items-center justify-center gap-2">
            ➕ Adicionar outra Equipe
          </button>

          <!-- BOTÃO 2: ATUALIZAR -->
          <button type="button" id="btnAtualizarEquipe" onclick="atualizarAssuncao()"
            class="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-lg shadow-md transition-all text-sm uppercase tracking-wide flex items-center justify-center gap-2">
            🔄 ATUALIZAR
          </button>`;

html = html.replace(alvoBotoes, novosBotoes);

// 3. Atualizar o bloco JavaScript completo
const scriptStartIdx = html.indexOf('<script>');
const scriptEndIdx = html.lastIndexOf('</script>');

const novoScript = `<script>

  // ── Padrões por Fração ──────────────────────────────────────────────────
  const PADROES_FRACAO = {
    'Sede':             { cidades: ['MUNDO NOVO'],               placa: 'REW-3B07', prefixo: '10.3184', tel: '67 99268-5540' },
    '2° PEL Iguatemi':   { cidades: ['IGUATEMI'],                  placa: 'SMK-3C53', prefixo: '10.3757', tel: '67 99211-5349' },
    '3° PEL Japorã':     { cidades: ['JAPORA'],                    placa: 'SMK-7A60', prefixo: '10.3747', tel: '67 99282-0703' },
    '4° PEL Eldorado':   { cidades: ['ELDORADO', 'PORTO MORUMBI'], placa: 'UGY-3H55', prefixo: '10.3975', tel: '67 99217-3603' }
  };

  let listaEfetivo         = [];
  let listaTurnos          = [];
  let kmPorVtr             = {};
  let equipesPorCmt        = {};

  // Estado Multi-Equipes
  let equipesAssuncao      = []; // Array com todas as equipes da assunção
  let indiceEquipeEmEdicao = -1; // -1 = nova equipe, >= 0 = editando equipe existente

  // ── Init ─────────────────────────────────────────────────────────────────
  window.onload = function () {
    const agora = new Date();
    document.getElementById('data').value = agora.toISOString().split('T')[0];
    document.getElementById('hora').value = '08:00';

    if (typeof google !== 'undefined' && google.script && google.script.run) {
      // Ambiente Google Apps Script (Produção)
      google.script.run
        .withSuccessHandler(inicializarDados)
        .withFailureHandler(function (err) {
          document.getElementById('loading').innerHTML =
            '<span class="text-red-600 font-bold">⚠️ Erro ao carregar dados: ' + err.message + '</span>';
        })
        .getDadosIniciais();
    } else {
      // Mock local completo com TODOS os 77 policiais da 14ª CIPM para http://localhost:8000
      setTimeout(function () {
        inicializarDados({
          efetivo: ${JSON.stringify(efetivoCompleto, null, 2)},
          turnosAbertos: [
            { idTurno: '20261118-SEDE-RP01-SIM', data: '18/11/2026', fracao: 'Sede', posto: 'RP 01', vtr: 'REW-3B07', kmInicial: 45200, cmt: '1SGT LUCIANO' }
          ],
          kmPorVtr: { 'REW-3B07': 45200, 'SMK-3C53': 38100, 'SMK-7A60': 61200, 'UGY-3H55': 29400 },
          equipesPorCmt: {
            '1SGT LUCIANO': { motorista: 'CB CASSIO', patrulheiro: '', despachante: 'CB BORGES' },
            '3SGT AIRAN':   { motorista: 'SD BRUNO',  patrulheiro: '', despachante: 'CB EDGAR' }
          }
        });
      }, 150);
    }
  };

  function inicializarDados(res) {
    listaEfetivo  = res.efetivo       || [];
    listaTurnos   = res.turnosAbertos  || [];
    kmPorVtr      = res.kmPorVtr       || {};
    equipesPorCmt = res.equipesPorCmt  || {};

    document.getElementById('loading').classList.add('hidden');
    document.getElementById('abaAssuncao').classList.remove('hidden');

    aoMudarFracao();
    preencherSelectTurnos();
  }

  // ── Troca de Abas ────────────────────────────────────────────────────────
  function trocarAba(aba) {
    const isAss = aba === 'assuncao';
    document.getElementById('abaAssuncao').classList.toggle('hidden', !isAss);
    document.getElementById('abaEncerramento').classList.toggle('hidden', isAss);
    document.getElementById('tabAssuncaoBtn').classList.toggle('active', isAss);
    document.getElementById('tabEncerramentoBtn').classList.toggle('active', !isAss);
  }

  // ── OPM e Equipe ─────────────────────────────────────────────────────────
  function obterOpmSelecionada() {
    const rad = document.querySelector('input[name="opm"]:checked');
    if (!rad) return 'Sede';
    if (rad.value === 'custom') {
      const custom = (document.getElementById('opm-custom-input').value || '').trim();
      return custom || 'Outra OPM';
    }
    return rad.value;
  }

  function aoMudarFracao(opmNome) {
    const opm = opmNome || obterOpmSelecionada();
    const padrao = PADROES_FRACAO[opm];
    if (padrao) {
      document.getElementById('vtrPlaca').value   = padrao.placa;
      document.getElementById('vtrPrefixo').value = padrao.prefixo;
      document.getElementById('telefone').value   = padrao.tel;
      atualizarKmInicialPorVtr(padrao.placa);
      configurarCamposEfetivo(padrao.cidades);
    } else {
      // Para OPM customizada ("Cadastrar OPM"), habilita o efetivo de todas as cidades
      configurarCamposEfetivo(['MUNDO NOVO', 'IGUATEMI', 'JAPORA', 'ELDORADO', 'PORTO MORUMBI', 'CPA 4']);
    }
  }

  function obterEquipeSelecionada() {
    const rad = document.querySelector('input[name="equipe_sel"]:checked');
    if (!rad) return 'RP 01';
    if (rad.value === 'Outra') {
      const custom = (document.getElementById('equipeCustom').value || '').trim();
      return custom || 'Outra Equipe';
    }
    return rad.value;
  }

  function selecionarRadioEquipe(val) {
    const r1 = document.getElementById('eq-rp01');
    const r2 = document.getElementById('eq-rp02');
    const rOutra = document.getElementById('eq-outra');
    const campoOutra = document.getElementById('campoEquipeOutra');

    if (val === 'RP 01') {
      r1.checked = true;
      campoOutra.classList.add('hidden');
    } else if (val === 'RP 02') {
      r2.checked = true;
      campoOutra.classList.add('hidden');
    } else {
      rOutra.checked = true;
      campoOutra.classList.remove('hidden');
      if (val !== 'Outra' && val) {
        document.getElementById('equipeCustom').value = val;
      }
    }
  }

  function aoMudarEquipeOpcao(val) {
    const campo = document.getElementById('campoEquipeOutra');
    if (val === 'Outra') {
      campo.classList.remove('hidden');
      document.getElementById('equipeCustom').focus();
    } else {
      campo.classList.add('hidden');
    }
  }

  function aoDigitarPlaca() {
    const placa = document.getElementById('vtrPlaca').value;
    atualizarKmInicialPorVtr(placa);
  }

  function atualizarKmInicialPorVtr(placa) {
    const placaLimpa = (placa || '').trim().toUpperCase();
    const kmSugestao = kmPorVtr[placaLimpa];
    const inpKm = document.getElementById('kmInicial');
    const hintKm = document.getElementById('hintKmInicialVtr');

    if (kmSugestao && kmSugestao > 0) {
      inpKm.value = kmSugestao;
      if (hintKm) {
        hintKm.textContent = \`📍 Último KM final registrado na planilha (\${placaLimpa}): \${kmSugestao}\`;
        hintKm.classList.remove('hidden');
      }
    } else {
      if (hintKm) hintKm.classList.add('hidden');
    }
  }

  // ── Normalização de texto e Telefones ─────────────────────────────────────
  function normalizarTexto(s) {
    return (s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\\u0300-\\u036f]/g, '')
      .trim();
  }

  function obterTelefonePolicial(nomePolicial) {
    if (!nomePolicial) return '';
    const alvo = normalizarTexto(nomePolicial);
    if (!alvo) return '';

    // 1. Busca exata pelo nome completo de exibição (ex: "3SGT AIRAN")
    let achado = listaEfetivo.find(p => normalizarTexto(p.nome) === alvo);
    if (achado && achado.telefone) return achado.telefone;

    // 2. Busca por nome de guerra
    achado = listaEfetivo.find(p => normalizarTexto(p.nomeGuerra) === alvo);
    if (achado && achado.telefone) return achado.telefone;

    // 3. Busca por inclusão (exibição, guerra ou nome completo)
    achado = listaEfetivo.find(p => {
      const pNome = normalizarTexto(p.nome);
      const pGuerra = normalizarTexto(p.nomeGuerra);
      const pCompl = normalizarTexto(p.nomeCompleto);
      return alvo.includes(pGuerra) || (pCompl && (alvo.includes(pCompl) || pCompl.includes(alvo))) || pNome.includes(alvo);
    });

    if (achado && achado.telefone) return achado.telefone;
    return '';
  }

  function formatarPolicialComTelefone(cargo, nome) {
    if (!nome) return '';
    const tel = obterTelefonePolicial(nome);
    const sufixoTel = tel ? \` - \${tel}\` : '';
    return \`\\n*\${cargo}:* \${nome}\${sufixoTel}\`;
  }

  function formatarDataBr(isoData) {
    if (!isoData) return '';
    const p = isoData.split('-');
    if (p.length === 3) return \`\${p[2]}/\${p[1]}/\${p[0]}\`;
    return isoData;
  }

  // ── Campos de Efetivo (Busca inteligente + Dropdown com rolagem) ─────────
  function configurarCamposEfetivo(cidadesP) {
    configurarBuscaCampo('cmt', 'dropdown-cmt', cidadesP, 'Selecione o Comandante', aoSelecionarComandante);
    configurarBuscaCampo('motorista', 'dropdown-motorista', cidadesP, 'Selecione o Motorista');
    configurarBuscaCampo('patrulheiro', 'dropdown-patrulheiro', cidadesP, 'Selecione o Patrulheiro');
    configurarBuscaCampo('despachante', 'dropdown-despachante', cidadesP, 'Selecione o Despachante');
  }

  function configurarBuscaCampo(idInput, idDropdown, cidadesP, placeholderText, onSelectCallback) {
    const input = document.getElementById(idInput);
    const dropdown = document.getElementById(idDropdown);
    if (!input || !dropdown) return;

    function renderizar(filtro = '') {
      dropdown.innerHTML = '';
      const f = normalizarTexto(filtro);
      const cidadesNorm = cidadesP.map(c => normalizarTexto(c));

      function policialCorresponde(p) {
        if (!f) return true;
        const nomeNorm   = normalizarTexto(p.nome);
        const guerraNorm = normalizarTexto(p.nomeGuerra);
        const complNorm  = normalizarTexto(p.nomeCompleto);
        return nomeNorm.includes(f) || guerraNorm.includes(f) || complNorm.includes(f);
      }

      const locais = listaEfetivo.filter(p => cidadesNorm.includes(normalizarTexto(p.cidade)) && policialCorresponde(p));
      const outros = listaEfetivo.filter(p => !cidadesNorm.includes(normalizarTexto(p.cidade)) && policialCorresponde(p));

      if (locais.length === 0 && outros.length === 0) {
        dropdown.innerHTML = '<div class="p-3 text-xs text-gray-400 text-center">Nenhum militar encontrado</div>';
        return;
      }

      if (locais.length) {
        const h1 = document.createElement('div');
        h1.className = 'px-3 py-1.5 bg-slate-100 text-[11px] font-bold text-pm-petroleo uppercase tracking-wider sticky top-0 border-b border-slate-200';
        h1.textContent = '📍 Efetivo da Fração';
        dropdown.appendChild(h1);

        locais.forEach(p => {
          const item = document.createElement('div');
          item.className = 'px-3 py-2 text-sm text-gray-800 hover:bg-slate-100 cursor-pointer border-b border-gray-50 flex justify-between items-center';
          item.innerHTML = \`<span>\${p.nome}</span><span class="text-[10px] text-gray-400 font-semibold">\${p.cidade}\${p.telefone ? ' • ' + p.telefone : ''}</span>\`;
          item.onmousedown = (e) => {
            e.preventDefault();
            input.value = p.nome;
            dropdown.classList.add('hidden');
            if (onSelectCallback) onSelectCallback(p.nome);
          };
          dropdown.appendChild(item);
        });
      }

      if (outros.length) {
        const h2 = document.createElement('div');
        h2.className = 'px-3 py-1.5 bg-slate-100 text-[11px] font-bold text-gray-600 uppercase tracking-wider sticky top-0 border-b border-slate-200';
        h2.textContent = '🔄 Outros Pelotões / Efetivo Geral';
        dropdown.appendChild(h2);

        outros.forEach(p => {
          const item = document.createElement('div');
          item.className = 'px-3 py-2 text-sm text-gray-800 hover:bg-slate-100 cursor-pointer border-b border-gray-50 flex justify-between items-center';
          item.innerHTML = \`<span>\${p.nome}</span><span class="text-[10px] text-gray-400 font-semibold">\${p.cidade}\${p.telefone ? ' • ' + p.telefone : ''}</span>\`;
          item.onmousedown = (e) => {
            e.preventDefault();
            input.value = p.nome;
            dropdown.classList.add('hidden');
            if (onSelectCallback) onSelectCallback(p.nome);
          };
          dropdown.appendChild(item);
        });
      }
    }

    input.onfocus = () => {
      renderizar(input.value);
      dropdown.classList.remove('hidden');
    };

    input.oninput = () => {
      renderizar(input.value);
      dropdown.classList.remove('hidden');
      if (idInput === 'cmt') {
        const f = normalizarTexto(input.value);
        const achado = listaEfetivo.find(p => normalizarTexto(p.nome) === f || normalizarTexto(p.nomeGuerra) === f);
        if (achado && onSelectCallback) onSelectCallback(achado.nome);
      }
    };

    input.onblur = () => {
      setTimeout(() => dropdown.classList.add('hidden'), 250);
    };
  }

  function toggleDropdown(idDropdown) {
    const dropdown = document.getElementById(idDropdown);
    if (!dropdown) return;
    const estaOculto = dropdown.classList.contains('hidden');
    document.querySelectorAll('[id^="dropdown-"]').forEach(d => d.classList.add('hidden'));
    if (estaOculto) {
      dropdown.classList.remove('hidden');
    }
  }

  // ── Carregar última equipe do Comandante selecionado ─────────────────────
  function aoSelecionarComandante(nomeCmt) {
    const nomeLimpo = (nomeCmt || '').trim();
    if (!nomeLimpo) return;

    const equipeAnterior = equipesPorCmt[nomeLimpo];
    const hint = document.getElementById('hintEquipeCmt');

    if (equipeAnterior) {
      let carregados = [];
      if (equipeAnterior.motorista) {
        document.getElementById('motorista').value = equipeAnterior.motorista;
        carregados.push(\`Motorista: \${equipeAnterior.motorista}\`);
      }
      if (equipeAnterior.patrulheiro) {
        document.getElementById('patrulheiro').value = equipeAnterior.patrulheiro;
        carregados.push(\`Patrulheiro: \${equipeAnterior.patrulheiro}\`);
      }
      if (equipeAnterior.despachante) {
        document.getElementById('despachante').value = equipeAnterior.despachante;
        carregados.push(\`Despachante: \${equipeAnterior.despachante}\`);
      }

      if (hint && carregados.length > 0) {
        hint.innerHTML = \`👥 <strong>Última guarnição de \${nomeLimpo} preenchida automaticamente!</strong><br><span class="text-[11px] text-emerald-700">\${carregados.join(' • ')}</span>\`;
        hint.classList.remove('hidden');
      }
    } else {
      if (hint) hint.classList.add('hidden');
    }
  }

  // ── Gestão de Múltiplas Equipes na Assunção ──────────────────────────────
  function capturarEquipeFormulario() {
    const cmt = document.getElementById('cmt').value.trim();
    const km  = document.getElementById('kmInicial').value;

    if (!cmt) {
      alert('Selecione ou digite o Comandante da equipe.');
      document.getElementById('cmt').focus();
      return null;
    }
    if (!km) {
      alert('Informe o KM Inicial da viatura.');
      document.getElementById('kmInicial').focus();
      return null;
    }

    return {
      posto:         obterEquipeSelecionada(),
      regime:        document.getElementById('regime').value,
      vtrPlaca:      document.getElementById('vtrPlaca').value.trim(),
      vtrPrefixo:    document.getElementById('vtrPrefixo').value.trim(),
      kmInicial:     km,
      materialCarga: document.getElementById('materialCarga').value.trim() || 'S/A',
      cmt:           cmt,
      motorista:     document.getElementById('motorista').value.trim(),
      patrulheiro:   document.getElementById('patrulheiro').value.trim(),
      despachante:   document.getElementById('despachante').value.trim(),
      obs:           document.getElementById('obs').value.trim(),
      idTurnoAtualizar: (indiceEquipeEmEdicao >= 0 && equipesAssuncao[indiceEquipeEmEdicao])
        ? equipesAssuncao[indiceEquipeEmEdicao].idTurnoAtualizar
        : null
    };
  }

  function adicionarOutraEquipe() {
    const eq = capturarEquipeFormulario();
    if (!eq) return;

    if (indiceEquipeEmEdicao >= 0) {
      equipesAssuncao[indiceEquipeEmEdicao] = eq;
      indiceEquipeEmEdicao = -1;
    } else {
      equipesAssuncao.push(eq);
    }

    renderizarCardsEquipes();
    limparFormularioParaNovaEquipe();

    const sec = document.getElementById('secaoEquipe');
    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
  }

  function adicionarOutraEquipePosSalvar() {
    limparFormularioParaNovaEquipe();
    document.getElementById('containerBotoesPreSalvar').classList.remove('hidden');
    document.getElementById('resultadoAssuncao').classList.add('hidden');
    document.getElementById('secaoEquipe').scrollIntoView({ behavior: 'smooth' });
  }

  function limparFormularioParaNovaEquipe() {
    indiceEquipeEmEdicao = -1;

    // Próximo posto sugerido
    const postosUsados = equipesAssuncao.map(e => e.posto);
    if (!postosUsados.includes('RP 01')) {
      selecionarRadioEquipe('RP 01');
    } else if (!postosUsados.includes('RP 02')) {
      selecionarRadioEquipe('RP 02');
    } else {
      selecionarRadioEquipe('Outra');
      document.getElementById('equipeCustom').value = '';
    }

    // Limpa campos
    document.getElementById('vtrPlaca').value = '';
    document.getElementById('vtrPrefixo').value = '';
    document.getElementById('kmInicial').value = '';
    document.getElementById('materialCarga').value = 'S/A';
    document.getElementById('cmt').value = '';
    document.getElementById('motorista').value = '';
    document.getElementById('patrulheiro').value = '';
    document.getElementById('despachante').value = '';
    document.getElementById('obs').value = '';

    const hintCmt = document.getElementById('hintEquipeCmt');
    if (hintCmt) hintCmt.classList.add('hidden');
    const hintKm = document.getElementById('hintKmInicialVtr');
    if (hintKm) hintKm.classList.add('hidden');

    const btnAdd = document.getElementById('btnAdicionarOutraEquipe');
    if (btnAdd) btnAdd.innerHTML = '➕ Adicionar outra Equipe';
  }

  function renderizarCardsEquipes() {
    const container = document.getElementById('containerEquipesAdicionadas');
    const listaDiv = document.getElementById('listaCardsEquipes');
    const badgeQtd = document.getElementById('badgeQtdEquipes');

    if (!equipesAssuncao.length) {
      container.classList.add('hidden');
      listaDiv.innerHTML = '';
      return;
    }

    container.classList.remove('hidden');
    badgeQtd.textContent = equipesAssuncao.length;
    listaDiv.innerHTML = '';

    equipesAssuncao.forEach((eq, idx) => {
      const card = document.createElement('div');
      card.className = 'bg-white border border-blue-200 rounded-lg p-2.5 flex items-center justify-between text-xs font-semibold shadow-sm';

      const infoDiv = document.createElement('div');
      infoDiv.className = 'flex items-center gap-2 flex-wrap';
      infoDiv.innerHTML = \`
        <span class="bg-pm-marinho text-white px-2 py-0.5 rounded text-[11px] font-black">\${eq.posto}</span>
        <span class="text-gray-900 font-bold">\${eq.cmt}</span>
        \${eq.vtrPlaca ? \`<span class="text-gray-500 font-medium">• VTR \${eq.vtrPlaca} (KM \${eq.kmInicial})</span>\` : ''}
      \`;

      const btnsDiv = document.createElement('div');
      btnsDiv.className = 'flex items-center gap-1.5 shrink-0';
      btnsDiv.innerHTML = \`
        <button type="button" onclick="editarEquipe(\${idx})" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-blue-900 rounded font-bold text-[11px] transition-colors border border-slate-300">✏️ Editar</button>
        <button type="button" onclick="removerEquipe(\${idx})" class="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded font-bold text-[11px] transition-colors border border-red-200">🗑️</button>
      \`;

      card.appendChild(infoDiv);
      card.appendChild(btnsDiv);
      listaDiv.appendChild(card);
    });
  }

  function editarEquipe(idx) {
    const eq = equipesAssuncao[idx];
    if (!eq) return;

    indiceEquipeEmEdicao = idx;
    selecionarRadioEquipe(eq.posto);

    document.getElementById('regime').value = eq.regime || '24h';
    document.getElementById('vtrPlaca').value = eq.vtrPlaca || '';
    document.getElementById('vtrPrefixo').value = eq.vtrPrefixo || '';
    document.getElementById('kmInicial').value = eq.kmInicial || '';
    document.getElementById('materialCarga').value = eq.materialCarga || 'S/A';
    document.getElementById('cmt').value = eq.cmt || '';
    document.getElementById('motorista').value = eq.motorista || '';
    document.getElementById('patrulheiro').value = eq.patrulheiro || '';
    document.getElementById('despachante').value = eq.despachante || '';
    document.getElementById('obs').value = eq.obs || '';

    const btnAdd = document.getElementById('btnAdicionarOutraEquipe');
    if (btnAdd) btnAdd.innerHTML = '💾 Salvar Alterações desta Equipe';

    document.getElementById('secaoEquipe').scrollIntoView({ behavior: 'smooth' });
  }

  function removerEquipe(idx) {
    if (confirm(\`Deseja remover a equipe \${equipesAssuncao[idx].posto} desta lista?\`)) {
      equipesAssuncao.splice(idx, 1);
      if (indiceEquipeEmEdicao === idx) {
        limparFormularioParaNovaEquipe();
      }
      renderizarCardsEquipes();
    }
  }

  // ── Montagem do Texto Unificado do WhatsApp para Todas as Equipes ────────
  function gerarTextoWhatsAppAssuncao(dadosGerais, listaEquipes) {
    let msg = \`Assunção de Serviço: *\${dadosGerais.fracao}*\\n\`;
    msg += \`Data: \${formatarDataBr(dadosGerais.data)} - \${dadosGerais.hora}\\n\`;

    listaEquipes.forEach((eq) => {
      if (listaEquipes.length > 1) {
        msg += \`\\n----------------------------------------\\n\`;
        msg += \`*EQUIPE: \${eq.posto.toUpperCase()}*\\n\`;
      } else {
        msg += \`\\n*Equipe:* \${eq.posto}\\n\`;
      }

      msg += \`Material carga e equipe: \${eq.materialCarga || 'S/A'}\\n\`;
      if (eq.vtrPlaca) {
        const pref = eq.vtrPrefixo ? \` (\${eq.vtrPrefixo})\` : '';
        msg += \`Vtr \${eq.vtrPlaca.toUpperCase()}\${pref} - km inicial: \${eq.kmInicial}\\n\`;
      }
      msg += formatarPolicialComTelefone('COMANDANTE', eq.cmt);
      if (eq.motorista)   msg += formatarPolicialComTelefone('Motorista', eq.motorista);
      if (eq.patrulheiro) msg += formatarPolicialComTelefone('Patrulheiro', eq.patrulheiro);
      if (eq.despachante) msg += formatarPolicialComTelefone('Despachante', eq.despachante);
      if (eq.obs)         msg += \`\\n*Obs:* \${eq.obs}\`;
    });

    if (dadosGerais.telefone) {
      msg += \`\\n\\n*Telefone Funcional:* \${dadosGerais.telefone}\`;
    }
    return msg;
  }

  // ── Salvar Todas as Equipes na Planilha ──────────────────────────────────
  function salvarTodasEquipes(isAtualizacao) {
    const btnSalvar = document.getElementById('btnSalvarAssuncao');
    const btnAtualizar = document.getElementById('btnAtualizarEquipe');

    // Se o formulário tiver Comandante preenchido no momento, inclui a equipe atual na lista
    const cmtAtual = document.getElementById('cmt').value.trim();
    const kmAtual  = document.getElementById('kmInicial').value;
    if (cmtAtual && kmAtual) {
      const eqAtual = capturarEquipeFormulario();
      if (eqAtual) {
        if (indiceEquipeEmEdicao >= 0) {
          equipesAssuncao[indiceEquipeEmEdicao] = eqAtual;
          indiceEquipeEmEdicao = -1;
        } else {
          const jaExiste = equipesAssuncao.some(e => e.posto === eqAtual.posto && e.cmt === eqAtual.cmt);
          if (!jaExiste) {
            equipesAssuncao.push(eqAtual);
          }
        }
        renderizarCardsEquipes();
      }
    }

    if (!equipesAssuncao.length) {
      alert('Informe ao menos uma equipe com Comandante e KM Inicial antes de salvar.');
      document.getElementById('cmt').focus();
      return;
    }

    const opm = obterOpmSelecionada();
    const dadosGerais = {
      data:     document.getElementById('data').value,
      hora:     document.getElementById('hora').value,
      fracao:   opm,
      telefone: document.getElementById('telefone').value.trim(),
      equipes:  equipesAssuncao
    };

    if (isAtualizacao) {
      if (btnAtualizar) {
        btnAtualizar.disabled = true;
        btnAtualizar.innerHTML = '<span class="spinner">⟳</span>&nbsp; Atualizando na planilha...';
      }
    } else {
      if (btnSalvar) {
        btnSalvar.disabled = true;
        btnSalvar.innerHTML = '<span class="spinner">⟳</span>&nbsp; Salvando equipes na planilha...';
      }
    }

    function processarSucesso(res) {
      if (btnSalvar) {
        btnSalvar.disabled = false;
        btnSalvar.innerHTML = '💾 Salvar Assunção';
      }
      if (btnAtualizar) {
        btnAtualizar.disabled = false;
        btnAtualizar.innerHTML = '🔄 ATUALIZAR';
      }

      document.getElementById('containerBotoesPreSalvar').classList.add('hidden');

      if (res.idTurnos && Array.isArray(res.idTurnos)) {
        res.idTurnos.forEach((id, i) => {
          if (equipesAssuncao[i]) equipesAssuncao[i].idTurnoAtualizar = id;
        });
      }

      const banner = document.getElementById('bannerStatusAssuncao');
      if (banner) {
        banner.className = 'banner-ok';
        banner.textContent = res.atualizado
          ? \`✅ \${equipesAssuncao.length} equipe(s) ATUALIZADA(S) com sucesso na planilha!\`
          : \`✅ \${equipesAssuncao.length} equipe(s) salva(s) com sucesso na planilha!\`;
      }

      const msg = gerarTextoWhatsAppAssuncao(dadosGerais, equipesAssuncao);

      document.getElementById('previewAssuncao').textContent = msg;
      document.getElementById('linkWhatsAssuncao').href =
        'https://api.whatsapp.com/send?text=' + encodeURIComponent(msg);

      const resContainer = document.getElementById('resultadoAssuncao');
      resContainer.classList.remove('hidden');
      resContainer.scrollIntoView({ behavior: 'smooth' });
    }

    if (typeof google !== 'undefined' && google.script && google.script.run) {
      google.script.run
        .withSuccessHandler(function (res) {
          processarSucesso(res);
          google.script.run.withSuccessHandler(function (r) {
            listaTurnos = r.turnosAbertos || [];
            kmPorVtr = r.kmPorVtr || kmPorVtr;
            equipesPorCmt = r.equipesPorCmt || equipesPorCmt;
            preencherSelectTurnos();
          }).getDadosIniciais();
        })
        .withFailureHandler(function (err) {
          if (btnSalvar) {
            btnSalvar.disabled = false;
            btnSalvar.innerHTML = '💾 Salvar Assunção';
          }
          if (btnAtualizar) {
            btnAtualizar.disabled = false;
            btnAtualizar.innerHTML = '🔄 ATUALIZAR';
          }
          mostrarBannerErro('Erro ao salvar equipes: ' + err.message);
        })
        .salvarAssuncao(dadosGerais);
    } else {
      // Mock local
      setTimeout(function () {
        const mockIds = equipesAssuncao.map((e, i) => 'LOCAL-' + Date.now() + '-' + i);
        processarSucesso({ sucesso: true, idTurnos: mockIds, atualizado: Boolean(isAtualizacao) });
      }, 350);
    }
  }

  function atualizarAssuncao() {
    salvarTodasEquipes(true);
  }

  // ── Turnos abertos (Encerramento) ────────────────────────────────────────
  function preencherSelectTurnos() {
    const sel = document.getElementById('turnoAberto');
    sel.innerHTML = '';
    if (!listaTurnos.length) {
      sel.innerHTML = '<option value="">Nenhum turno em andamento</option>';
      document.getElementById('infoKmInicial').textContent = '';
      return;
    }
    listaTurnos.forEach(t => {
      const texto = \`\${t.data} | \${t.fracao} – \${t.posto} (\${t.vtr || 'Sem VTR'})\`;
      sel.appendChild(new Option(texto, t.idTurno));
    });
    aoMudarTurno();
  }

  function aoMudarTurno() {
    const id    = document.getElementById('turnoAberto').value;
    const turno = listaTurnos.find(t => t.idTurno === id);
    const p     = document.getElementById('infoKmInicial');
    p.textContent = turno ? \`KM Inicial registrado: \${turno.kmInicial}\` : '';
    calcularKmRodado();
  }

  function calcularKmRodado() {
    const id     = document.getElementById('turnoAberto').value;
    const turno  = listaTurnos.find(t => t.idTurno === id);
    const kmFinal = Number(document.getElementById('kmFinal').value);
    const div    = document.getElementById('infoKmRodado');
    if (turno && kmFinal > 0) {
      const diff = kmFinal - turno.kmInicial;
      div.textContent = diff >= 0
        ? \`✅ KM Rodado no plantão: \${diff} km\`
        : '⚠️ KM final menor que o inicial!';
      div.className = diff >= 0 ? 'hint' : 'hint hint-warn';
    } else {
      div.textContent = '';
    }
  }

  // ── Enviar Encerramento ──────────────────────────────────────────────────
  function enviarEncerramento() {
    const idTurno = document.getElementById('turnoAberto').value;
    if (!idTurno) { alert('Selecione um turno em andamento.'); return; }

    const kmFinal = document.getElementById('kmFinal').value;
    if (!kmFinal) { alert('Informe o KM Final antes de encerrar.'); return; }

    const turno = listaTurnos.find(t => t.idTurno === idTurno);
    const btn   = document.getElementById('btnSalvarEncerramento');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner">⟳</span>&nbsp; Salvando encerramento...';

    const dados = {
      idTurno,
      kmFinal,
      abordagensPessoas: document.getElementById('abordagensPessoas').value,
      abordagensVeiculos: document.getElementById('abordagensVeiculos').value,
      autosInfracao: document.getElementById('autosInfracao').value,
      remocoesVeiculos: document.getElementById('remocoesVeiculos').value
    };

    function processarSucessoEncerramento(res) {
      btn.disabled = false;
      btn.innerHTML = '🔒 Encerrar Turno e Gerar WhatsApp';

      let msg = \`Passagem de Serviço: *\${turno ? turno.fracao : 'Sede'}*\\n\`;
      msg += \`Data: \${turno ? turno.data : '19/11/2026'} | \${turno ? turno.posto : 'RP 01'}\\n\`;
      if (turno && turno.vtr) {
        msg += \`Vtr \${turno.vtr} – km final: \${dados.kmFinal} (Rodado: \${res.kmRodado} km)\\n\`;
      }
      msg += \`\\n*Produtividade do Turno:*\\n\`;
      msg += \`• Abordagens Pessoas: \${dados.abordagensPessoas}\\n\`;
      msg += \`• Abordagens Veículos: \${dados.abordagensVeiculos}\\n\`;
      msg += \`• Autos de Infração: \${dados.autosInfracao}\\n\`;
      msg += \`• Remoções: \${dados.remocoesVeiculos}\`;

      document.getElementById('previewEncerramento').textContent = msg;
      document.getElementById('linkWhatsEncerramento').href =
        'https://api.whatsapp.com/send?text=' + encodeURIComponent(msg);
      document.getElementById('resultadoEncerramento').classList.remove('hidden');
      document.getElementById('resultadoEncerramento').scrollIntoView({ behavior: 'smooth' });
    }

    if (typeof google !== 'undefined' && google.script && google.script.run) {
      google.script.run
        .withSuccessHandler(function (res) {
          processarSucessoEncerramento(res);
          google.script.run.withSuccessHandler(function (r) {
            listaTurnos = r.turnosAbertos || [];
            preencherSelectTurnos();
          }).getDadosIniciais();
        })
        .withFailureHandler(function (err) {
          btn.disabled = false;
          btn.innerHTML = '🔒 Encerrar Turno e Gerar WhatsApp';
          mostrarBannerErro('Erro ao encerrar: ' + err.message);
        })
        .salvarEncerramento(dados);
    } else {
      setTimeout(function () {
        const kmRod = Math.max(0, (Number(dados.kmFinal) || 0) - (turno ? turno.kmInicial : 0));
        processarSucessoEncerramento({ sucesso: true, kmRodado: kmRod });
      }, 300);
    }
  }

  // ── Utilitários ──────────────────────────────────────────────────────────
  function ajustarContador(id, delta) {
    const inp = document.getElementById(id);
    const val = Math.max(0, (Number(inp.value) || 0) + delta);
    inp.value = val;
  }

  function copiarTexto(idElemento) {
    const texto = document.getElementById(idElemento).textContent;
    navigator.clipboard.writeText(texto).then(() => {
      alert('✅ Mensagem copiada para a área de transferência!');
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = texto;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      alert('✅ Mensagem copiada!');
    });
  }

  function mostrarBannerErro(msg) {
    const div = document.createElement('div');
    div.className = 'banner-err mx-4 mb-2';
    div.textContent = '⚠️ ' + msg;
    document.querySelector('.space-y-5').prepend(div);
    setTimeout(() => div.remove(), 8000);
  }

</script>`;

html = html.substring(0, scriptStartIdx) + novoScript + html.substring(scriptEndIdx + 9);

fs.writeFileSync('controle_plantao.html', html, 'utf8');
console.log('controle_plantao.html updated successfully!');
