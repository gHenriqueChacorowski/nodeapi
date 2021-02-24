const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json([{ nome: "Henrique", email: "henrique.chacorowski@gmail.com "}]);
});

module.exports = router;