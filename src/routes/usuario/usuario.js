const express = require('express');
const router = express.Router();

router.get('/:id?', (req, res) => {
    if (req.params.id) {
        res.send("Listagem de usuários");
    }
    res.send("Listagem de usuário"); 
});

router.post('/', (req, res) => {
    res.send("Usuário criado");
});

router.delete('/:id', (req, res) => {
    res.send("Usuário deletado");
});

router.put('/:id', (req, res) => {
    res.send("Usuário atualizado");
});

module.exports = router;