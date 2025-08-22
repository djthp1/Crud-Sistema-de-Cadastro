Gerenciamento de Contatos: Aplicação Web Completa 📞
Este projeto é uma aplicação web de gerenciamento de contatos, desenvolvida com React no frontend, projetada para interagir com uma API RESTful no backend. Permite aos usuários cadastrar, visualizar, editar e excluir informações de contato de forma intuitiva.

Funcionalidades ✨
Cadastro de Contatos: Adicione novos contatos (nome, telefone, email).

Listagem de Contatos: Visualize todos os contatos existentes.

Edição de Contatos: Atualize as informações de contatos já cadastrados.

Exclusão de Contatos: Remova contatos da lista.

Interface Reativa: As alterações são refletidas instantaneamente.

Tecnologias Utilizadas 🚀
Frontend
React: Construção da interface de usuário.

JavaScript (ES6+): Lógica da aplicação.

HTML5 & CSS: Estrutura e estilização básica.

Backend
O backend é construído com tecnologias modernas para criar uma API RESTful robusta e persistir os dados.

Node.js: Ambiente de execução para o backend.

Fastify.js: Framework web de alto desempenho para Node.js, utilizado para criar a API REST.

SQLite3: Banco de dados relacional leve, baseado em arquivo, para armazenamento dos contatos.

@fastify/cors: Plugin Fastify para habilitar o CORS (Cross-Origin Resource Sharing), permitindo que o frontend (rodando em uma porta diferente) se comunique com o backend.

Configuração do Backend 🛠️
Para o funcionamento do frontend, é necessário um servidor backend rodando em http://localhost:3001 que exponha os seguintes endpoints para operações CRUD em contatos:

GET /api/items: Retorna todos os contatos.

POST /api/items: Cria um novo contato.

PUT /api/items/:id: Atualiza um contato existente.

DELETE /api/items/:id: Exclui um contato.

Passos Essenciais para o Backend (Node.js/Fastify com SQLite3):

Crie e Inicialize o Projeto Backend:

Crie um novo diretório para o seu backend.

Navegue até esse diretório no terminal.

Inicialize um novo projeto Node.js.

Instale as Dependências:

Instale fastify, sqlite3 e @fastify/cors.

Crie o Arquivo Principal do Servidor:

Crie um arquivo (ex: index.js ou server.js) no diretório do seu backend.

Neste arquivo, você configurará o Fastify, estabelecerá a conexão com o banco de dados SQLite (o arquivo .sqlite será criado automaticamente se não existir) e definirá todas as rotas da API (POST, GET, PUT, DELETE) para gerenciar os contatos.

Inicie o Servidor Backend:

Execute o arquivo principal do servidor Node.js.

Configuração do Frontend 💻
Com o backend rodando, configure e inicie o frontend:

Navegue até o diretório raiz do seu projeto React.

Instale as Dependências:

npm install # ou yarn install

Inicie a Aplicação:

npm start # ou yarn start

A aplicação será aberta em seu navegador (geralmente http://localhost:3000).

Uso e Interação 🚀
Formulário de Cadastro/Edição: Preencha os campos (Nome, Telefone, Email) e clique em "Salvar Contato" para adicionar. Se estiver editando um contato, o botão será "Atualizar Contato".

Lista de Contatos: Abaixo do formulário, os contatos cadastrados são exibidos. Use os botões "Editar" para modificar um contato ou "Deletar" para removê-lo.

Considerações Adicionais 🤔
Estilização: Para melhorar a aparência, adicione CSS personalizado ou use frameworks como Tailwind CSS/Bootstrap.

Validação de Formulário: Recomenda-se implementar validações robustas no frontend e backend.

Mensagens de Feedback: Substitua os alert() por componentes de UI mais amigáveis para notificações.

Tratamento de Erros: Aprimore o tratamento de erros com feedback visual para o usuário.

Variáveis de Ambiente: Utilize variáveis de ambiente para a URL da API em ambientes de produção.
