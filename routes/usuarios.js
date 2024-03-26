const express = require('express');
const router = express.Router();
const { getUsers, createUser, deleteUser, editUser } = require('../controllers/userController');

// Rota para obter todos os usuários
router.get('/users', getUsers);

// Rota para cadastrar um novo usuário
router.post('/users', createUser);

router.delete('/users/:id', deleteUser);

router.put('/users/:id', editUser);

module.exports = router;
