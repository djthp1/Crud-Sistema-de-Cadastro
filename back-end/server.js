    const fastify = require('fastify')({ logger: true });
    const sqlite3 = require('sqlite3').verbose();
    const cors = require('@fastify/cors');

    // Configuração de CORS para permitir todos os métodos e origens
    fastify.register(cors, {
      origin: '*', // Permite todas as origens (ajuste em produção para domínios específicos)
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permite os métodos necessários para o CRUD
    });

    // Conexão com o banco de dados
    const db = new sqlite3.Database('./database.sqlite', (err) => {
      if (err) {
        console.error('Erro ao conectar com o banco de dados:', err.message);
      } else {
        console.log('Conectado ao banco de dados SQLite.');
      }
    });

    // Cria a tabela 'items' se ela não existir
    db.run(`
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        telefone TEXT NOT NULL,
        email TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error('Erro ao criar a tabela:', err.message);
      } else {
        console.log('Tabela "items" verificada/criada com sucesso.');
      }
    });

    // --- ROTAS DO CRUD ---

    // Rota para Inserir Dados (POST)
    fastify.post('/api/items', (request, reply) => {
      const { nome, telefone, email } = request.body;

      if (!nome || !telefone || !email) {
        return reply.code(400).send({ error: 'Todos os campos são obrigatórios.' });
      }

      const sql = `INSERT INTO items (nome, telefone, email) VALUES (?, ?, ?)`;
      const params = [nome, telefone, email];

      db.run(sql, params, function (err) {
        if (err) {
          console.error(err.message);
          return reply.code(500).send({ error: 'Erro ao inserir dados.' });
        }
        reply.code(201).send({
          id: this.lastID,
          message: 'Dados inseridos com sucesso!'
        });
      });
    });

    // Rota para Ler Dados (GET)
    fastify.get('/api/items', (request, reply) => {
      const sql = `SELECT * FROM items`;
      db.all(sql, [], (err, rows) => {
        if (err) {
          console.error(err.message);
          return reply.code(500).send({ error: 'Erro ao buscar dados.' });
        }
        reply.send(rows);
      });
    });

    // Rota para Atualizar Dados (PUT)
    fastify.put('/api/items/:id', (request, reply) => {
      const { id } = request.params;
      const { nome, telefone, email } = request.body;

      if (!nome || !telefone || !email) {
        return reply.code(400).send({ error: 'Todos os campos são obrigatórios.' });
      }

      const sql = `UPDATE items SET nome = ?, telefone = ?, email = ? WHERE id = ?`;
      const params = [nome, telefone, email, id];

      db.run(sql, params, function (err) {
        if (err) {
          console.error(err.message);
          return reply.code(500).send({ error: 'Erro ao atualizar dados.' });
        }

        if (this.changes === 0) {
          return reply.code(404).send({ error: 'Item não encontrado.' });
        }

        // Não precisa retornar JSON aqui se o front-end não espera.
        // O status 200 OK já é suficiente.
        reply.code(200).send({ message: 'Dados atualizados com sucesso!' });
      });
    });

    // Rota para deletar dados (DELETE)
    fastify.delete('/api/items/:id', (request, reply) => {
      const {id} = request.params;
      const sql = `DELETE FROM items WHERE id = ?`;
      const params = [id];

      db.run(sql, params, function (err) {
        
        if(err) {
          console.error(err.message);
          return reply.code(500).send({ error: 'Erro ao excluir dados.'});
        }

        if (this.changes === 0) {
          return reply.code(404).send({ error: 'Item não encontrado.'});
        }

        reply.code(200).send({message: 'Dados excluidos com sucesso!'});
      });
    });


    // --- Iniciar o Servidor ---
    const start = async () => {
      try {
        await fastify.listen({ port: 3001 });
      } catch (err) {
        fastify.log.error(err);
        process.exit(1);
      }
    };

    start();