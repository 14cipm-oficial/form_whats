# 14ª CIPM – Sistema Integrado de Plantão, Ocorrências e Escala (PMMS)

Sistema web mobile-first desenvolvido para a **14ª Companhia Independente de Polícia Militar (14ª CIPM / PMMS)** para gestão operacional diária, controle de plantão da guarnição, registro estruturado de produtividade, automação de mensagens de WhatsApp e cálculo da pontuação do **"Policial Padrão"**.

---

## 🌐 Módulos do Sistema

| Módulo | Acesso | Descrição |
|---|---|---|
| **Resumo Diário de Ocorrências** | [relatorio.zerog.com.br](https://relatorio.zerog.com.br) | Formulário de produtividade da viatura com validações automáticas, detalhamento de veículos, mandados e envio para o WhatsApp e planilha. |
| **Assunção e Encerramento (Plantão)** | [Web App de Plantão](https://script.google.com/macros/s/AKfycbxrsLCvIjjtNhvok4eSDc01lUkwmsWHzv-lM9mElwbo3xbUWQNu08yPbUJGSnO07jE/exec) | Cadastro da guarnição (CMT, motorista, patrulheiro, despachante), controle de KM, registro de produtividade e alimentação automática do "Policial Padrão". |
| **Painel de Eventos e Escalas (SS)** | [relatorio.zerog.com.br/eventos](https://relatorio.zerog.com.br/eventos) | Painel das Solicitações de Serviço (SS) e policiamento escolar com alarme sonoro aos 20 minutos de antecedência e geração de impressão. |

---

## 🔒 Segurança e Controle de Acesso (SSO)

Todo o ecossistema é protegido por **Single Sign-On (Google Identity)**:
* Apenas contas autenticadas e autorizadas no Google Group **`14cipm-geral@googlegroups.com`** ou na aba **`Autorizados`** da planilha institucional conseguem acessar os formulários.
* A autenticação é compartilhada entre todos os módulos no domínio `relatorio.zerog.com.br`.

---

## 📁 Estrutura do Repositório

```text
├── Brasão_PMMS.PNG                         # Brasão oficial da PMMS em alta definição
├── CNAME                                   # Apontamento de domínio (relatorio.zerog.com.br)
├── ECOSSISTEMA.md                          # Mapeamento técnico de planilhas, scripts e replicação
├── README.md                               # Apresentação geral do projeto
├── controle_plantao.html                   # Layout local de referência para Assunção/Encerramento
├── index.html                              # Formulário principal de Resumo de Serviço (Raiz)
├── operacoes.js                            # Lista de operações vigentes da unidade
├── eventos/
│   ├── index.html                          # Painel operacional de Solicitações de Serviço (SS)
│   └── adm/index.html                      # Painel de configurações administrativas (tons de alarme)
├── scripts/
│   └── leitura_assuncao_servico/           # Código-fonte sincronizado com Google Apps Script (via clasp)
│       ├── .clasp.json                     # Configuração de sincronização CLI
│       ├── appsscript.json                 # Manifesto do Google Apps Script (Fuso MS)
│       ├── Code.js                         # Backend GAS (gravação em Registro_Plantao e Guarnicao_Policial)
│       └── Index.html                      # Interface web oficial servida pelo Apps Script
└── contexto/                               # Backups, referências e documentações auxiliares
```

---

## 📖 Documentação Técnica Completa e Guia de Replicação

Para consultar a lista completa de **IDs de planilhas, abas, colunas, scripts do Google Apps Script** e o **passo a passo para replicar este sistema em outros Batalhões e OPMs da PMMS**, consulte o arquivo:

👉 **[ECOSSISTEMA.md](ECOSSISTEMA.md)**
