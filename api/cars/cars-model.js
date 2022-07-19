const db = require('../../data/db-config');

const getAll = () => {
  return db('cars');
}

const getById = id => {
  return db('cars').where('id', id).first();
}

const getByVin = vin => {
  return db('cars').where('vin', vin).first();
}

const create = car => {
  return db('cars').insert(car).then(ids => getById(ids[0]))
}

const update = (id, car) => {
  return db('cars').where('id', id).update(car).then(number => getById(id))
}

const remove = id => {
  return db('cars').where('id', id).delete();
}

module.exports = {
  getAll,
  getById,
  getByVin,
  create,
  update,
  remove
}
