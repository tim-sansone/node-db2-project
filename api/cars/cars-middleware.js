const Cars = require('./cars-model')
const vinValidator = require('vin-validator');

const checkCarId = (req, res, next) => {
  const { id } = req.params;
  Cars.getById(id)
    .then(car => {
      if(!car){
        next({status: 404, message: `car with id ${id} is not found`})
      } else{
        req.car = car
        next()
      }
    })
    .catch(next);
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  if(vin == null){
    res.status(400).json({message: `vin is missing`});
    return;
  }
  if(make == null){
    res.status(400).json({message: `make is missing`});
    return;
  }
  if(model == null){
    res.status(400).json({message: `model is missing`});
    return;
  }
  if(mileage == null){
    res.status(400).json({message: `mileage is missing`});
    return;
  }
  next();
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;
  const isValid = vinValidator.validate(vin)
  if(!isValid){
    next({status: 400, message: `vin ${vin} is invalid`})
    return
  }
  next()
}

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body;
  const car = await Cars.getByVin(vin)
  if(car){
    next({status: 400, message: `vin ${vin} already exists`})
    return
  }
  next()
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
