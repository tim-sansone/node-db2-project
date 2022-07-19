const express = require('express');
const router = express.Router();

const { checkCarId } = require('./cars-middleware');

const Cars = require('./cars-model')

router.get('/', (req, res) => {
    Cars.getAll().then(cars => res.json(cars))
})

router.get('/:id', checkCarId, (req, res) => {
    res.json(req.car);
})

module.exports = router;
