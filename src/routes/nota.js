const { Router } = require('express');
const router = Router();

router.get('/:id?', (req, res) => {
    if (req.params.id) {
        res.send("Listagem de notas");
    }
    res.send("Listagem de nota"); 
});

router.post('/', (req, res) => {
    res.send("Nota criada");
});

router.delete('/:id', (req, res) => {
    res.send("Nota deletada");
});

router.put('/:id', (req, res) => {
    res.send("Nota atualizada");
});

module.exports = router;