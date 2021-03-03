const { Router } = require('express');
const router = Router();
const controller = require('../controller/usuario');

router.get('/:id?', (req, res) => {
  const usuarios = controller.getUsuarios();

  res.send(usuarios);
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