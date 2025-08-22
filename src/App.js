import React, { useState, useEffect } from 'react';


function App() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const fetchItems = async () => {
    console.log('--- Buscando itens do servidor ---');
    try {
      const response = await fetch('http://localhost:3001/api/items');
      console.log('Resposta da requisição GET:', response); // Log da resposta completa
      if (response.ok) {
        const data = await response.json();
        console.log('Dados recebidos do servidor (GET):', data);
        setItems(data);
      } else {
        console.error('Erro ao buscar os dados (GET) - Resposta não ok:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição GET:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEditClick = (item) =>{
    // Preenche os campos do formulário com os dados do item
    setNome(item.nome);
    setTelefone(item.telefone);
    setEmail(item.email);
    setEditingItem(item); // Define o que está sendo editado
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosDoFormulario = {
      nome: nome,
      telefone: telefone,
      email: email
    };

  let url = 'http://localhost:3001/api/items';
  let method = 'POST';

  if (editingItem) {
    url = `http://localhost:3001/api/items/${editingItem.id}`;
    method = 'PUT';
  }

    console.log('Dados a serem enviados (POST):', dadosDoFormulario); // Log dos dados enviados

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosDoFormulario),
      });

      console.log('Resposta da requisição POST:', response); // Log da resposta completa
      console.log('response.ok (POST):', response.ok); // Log explícito de response.ok

      if (response.ok) {
        const data = await response.json();
        console.log('Dados salvos com sucesso (POST):', data);
        fetchItems(); 
        
        if (editingItem) {
        alert('Item atualizado com sucesso!');
        } else {
          alert('Item criado com sucesso!');

        }
        setNome('');
        setTelefone('');
        setEmail('');
        setEditingItem(null); //volta para o modo de criação
      } else {
        // Se response.ok for false, exibe o status e o texto do erro
        console.error('Erro ao salvar os dados (POST) - Resposta não ok:', response.status, response.statusText);
        alert('Erro ao criar o item.');
      }
    } catch (error) {
      console.error('Erro na requisição POST:', error);
      alert('Erro na comunicação com o servidor.');
    }
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir?');
    if (!confirmDelete){
      return; // se o usuário cancelar não faz nada
    }

    try {
      //1. Constrói a URL para a requisição DELETE usando o ID
      const url = `http://localhost:3001/api/items/${id}`;

      const response = await fetch(url, {
        method: 'DELETE', 
      });

      if (response.ok){
        alert('Item excluido com sucesso');
        fetchItems();
      } else {
        const errorBody = await response.text(); // tenta ler o corpo do erro
        console.error('Erro ao excluir o item - Resposta não ok:', response.statusText, 'Body:', errorBody);
        alert('Erro ao excluir o item:' + (errorBody || response.statusText));
      }
    } catch (error) {
      console.error ('Erro na requisição DELETE (catch):', error);
      alert('Erro na comunicação com o servidor ao excluir.');
    }
    };
  

  return (
    <div className="App">
      <h1>Cadastro de Contato</h1>
      
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            placeholder='Insira seu nome'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>

        <label>
          Telefone:
          <input
            type="text"
            placeholder='Insira seu telefone'
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            placeholder='Insira seu email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        
        <button type="submit">
        {editingItem ? 'Atualizar Contato' : 'Salvar Contato'}
        </button>
      </form>

      <h2>Contatos Cadastrados</h2>
      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id}>
              Nome: {item.nome}, Telefone: {item.telefone}, Email: {item.email}
              <button onClick={() => handleEditClick(item)}>Editar</button>
              <button onClick={() => handleDeleteClick(item.id)}>Deletar</button>
            </li>
          ))
        ) : (
          <p> Nenhum contato cadastrado</p>
        )};
      </ul>
    </div>
  );
}
export default App;