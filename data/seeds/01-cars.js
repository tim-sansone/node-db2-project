
exports.seed = async function(knex) {
  
  await knex('cars').truncate()
  await knex('cars').insert([
    { vin: "12312312312312312", make: "Nissan", model: "Sentra", mileage: 133000 },
    { vin: "32132132132132132", make: "Toyota", model: "Corrola", mileage: 165001 },
    { vin: "45645645645645645", make: "Subaru", model: "Outback", mileage: 60000 },
    { vin: "65465465465465465", make: "Ford", model: "Raptor", mileage: 25000 }
  ]);
};
