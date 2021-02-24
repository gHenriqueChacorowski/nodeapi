const express = require('express');
const router = express.Router();

router.get('/:id?', (req, res) => {
    if (req.params.id) {
        res.send("Listagem de tags");
    }
    res.send("Listagem de tag"); 
});

router.post('/', (req, res) => {
    res.send("Tag criada");
});

router.delete('/:id', (req, res) => {
    res.send("Tag deletada");
});

router.put('/:id', (req, res) => {
    res.send("Tag atualizada");
});

module.exports = router;