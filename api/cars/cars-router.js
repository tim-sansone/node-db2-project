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

router.put('/:id', checkCarId, (req, res, next) => {
    Cars.update(req.params.id, req.body)
        .then(car => res.json(car))
        .catch(next)
})

router.delete('/:id', checkCarId, (req, res, next) => {
    Cars.remove(req.params.id)
        .then(number => res.json(req.car))
        .catch(next)
})

module.exports = router;
