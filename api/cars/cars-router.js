const express = require('express');
const router = express.Router();

const Cars = require('./cars-model')

router.get('/', (req, res) => {
    Cars.getAll().then(cars => res.json(cars))
})

module.exports = router;
