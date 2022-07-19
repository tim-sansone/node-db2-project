const express = require('express');
const router = express.Router();

const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
} = require('./cars-middleware');

const Cars = require('./cars-model')

router.get('/', (req, res, next) => {
    Cars.getAll()
        .then(cars => res.json(cars))
        .catch(next)
})

router.get('/:id', checkCarId, (req, res) => {
    res.json(req.car);
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
    Cars.create(req.body)
        .then(car => res.status(201).json(car))
        .catch(next)
})

module.exports = router;
