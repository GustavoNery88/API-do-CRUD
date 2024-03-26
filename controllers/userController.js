const supabase = require('../db');

// Função para obter todos os usuários
async function getUsers(req, res) {
  try {
    const { data, error } = await supabase.from('usuarios').select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Error getting users', err);
    res.status(500).json({ error: 'Error getting users' });
  }
}


// Rota para cadastrar um novo usuário
async function createUser(req, res) {
  try {
    const { nome, email, idade } = req.body;
    const { data, error } = await supabase.from('usuarios').insert([{ nome, email, idade }]);
    if (error) throw error;
    res.status(201).json({ message: 'User created successfully', data });
  } catch (err) {
    console.error('Error creating user', err);
    res.status(500).json({ error: 'Error creating user' });
  }
}

// Rota para deletar um usuário
async function deleteUser(req, res) {
  try {
    const { id } = req.params; 
    const { error } = await supabase
      .from('usuarios') 
      .delete()
      .eq('id', id); 

    if (error) throw error;
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user', err); 
    res.status(500).json({ error: 'Error deleting user' });
  }
}

// Rota para editar um usuário
async function editUser(req, res) {
  try {
    const { id } = req.params; // Obtém o ID do usuário a ser editado
    const { nome, email, idade } = req.body; // Obtém os novos dados do usuário

    // Verifica se todos os campos necessários estão presentes
    if (!nome || !email || !idade) {
      return res.status(400).json({ error: 'Nome, email e idade são campos obrigatórios' });
    }

    // Verifica se o usuário com o ID fornecido existe no banco de dados
    const { data: existingUser, error: fetchError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    // Se o usuário não for encontrado, retorna um erro
    if (!existingUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Atualiza os dados do usuário
    const { data: updatedUser, error: updateError } = await supabase
      .from('usuarios')
      .update({ nome, email, idade })
      .eq('id', id)
      .single();

    if (updateError) throw updateError;

    // Retorna os dados do usuário atualizados
    res.json({ message: 'Usuário atualizado com sucesso', data: updatedUser });
  } catch (err) {
    console.error('Error updating user', err);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
}




module.exports = { getUsers, createUser, deleteUser, editUser };
