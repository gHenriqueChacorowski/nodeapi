const express = require('express');
const router = express.Router();

router.get('/:id?', (req, res) => {
    if (req.params.id) {
        res.send("Listagem de checklists");
    }
    res.send("Listagem de checklist"); 
});

router.post('/', (req, res) => {
    res.send("Checklist criado");
});

router.delete('/:id', (req, res) => {
    res.send("Checklist deletado");
});

router.put('/:id', (req, res) => {
    res.send("Checklist atualizado");
});

module.exports = router;