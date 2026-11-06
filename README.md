# helpdesk-login

Desafio da disciplina **Desenvolvimento de Interface de Usuário Web**: criar a página de login do HelpDesk Lite e receber um `access_token` da API.

Autoria: [@Soares23Ana](https://github.com/Soares23Ana)

Projeto feito a partir dos materiais da disciplina:

- [helpdesk-web](https://github.com/marcelo-ciacco/devweb/tree/main/helpdesk-web): front-end em React + TypeScript + Tailwind
- [helpdesk-jrs](https://github.com/marcelo-ciacco/devweb/tree/main/helpdesk-jrs): API local com JSON REST Server e autenticação JWT

## O que foi feito

### Página de login (`/login`)

- Formulário com e-mail, senha e a opção "Entrar como administrador".
- Envia `POST /auth` para a API. Quando a opção de administrador está marcada, envia também `admin: true`.
- Com o login certo, mostra o `access_token` recebido e o guarda no `localStorage`.
- Com o login errado, mostra a mensagem "E-mail ou senha inválidos".
- Um botão leva para a lista de chamados, que é carregada da API usando o token.

### Arquivos criados

| Arquivo | Função |
|---|---|
| `helpdesk-web/src/pages/LoginPage.tsx` | Tela de login |
| `helpdesk-web/src/services/authService.ts` | Funções `login`, `me`, `getToken`, `isAuthenticated` e `logout` |
| `helpdesk-web/src/types/Auth.ts` | Tipos da requisição e da resposta da autenticação |

### Arquivos alterados

| Arquivo | Alteração |
|---|---|
| `helpdesk-web/src/App.tsx` | Nova rota `/login`, fora do layout com a Navbar |
| `helpdesk-web/src/components/Navbar.tsx` | Botão "Entrar", que vira "Sair" depois do login |
| `helpdesk-web/src/services/ticketService.ts` | `create()` completado (POST com o token) |
| `helpdesk-web/src/pages/NewTicketPage.tsx` | Formulário ligado ao `handleSubmit`, com tratamento de erro |
| `helpdesk-web/src/pages/TicketPage.tsx` | Mensagem de erro passa a ser exibida |

## Como rodar

São duas aplicações independentes, cada uma em um terminal.

### 1. API (helpdesk-jrs)

É preciso ter o [Dart SDK](https://dart.dev/get-dart) instalado. O Flutter já inclui o Dart.

```bash
dart pub global activate json_rest_server
cd helpdesk-jrs
```

Os arquivos `config.yaml` e `database.json` não vão para o Git porque contêm senhas de teste. Crie os dois a partir dos modelos:

```bash
cp config.example.yaml config.yaml
cp database.example.json database.json
json_rest_server run
```

A API fica em `http://127.0.0.1:5050`.

### 2. Front-end (helpdesk-web)

```bash
cd helpdesk-web
npm install
npm run dev
```

Abra `http://localhost:5173/login`.

## Como testar

| Perfil | E-mail | Senha | Opção de administrador |
|---|---|---|---|
| Usuário | `usuario@helpdesk.local` | `Usuario@123` | desmarcada |
| Admin | `admin@helpdesk.local` | `Admin@123` | marcada |

Essas senhas são fictícias e existem só para teste local.

1. Entre com uma das contas acima. O `access_token` aparece na tela.
2. Clique em **Ir para os chamados**. Os chamados são carregados da API com o token no cabeçalho `Authorization: Bearer`.
3. Tente uma senha errada. A tela mostra "E-mail ou senha inválidos".
