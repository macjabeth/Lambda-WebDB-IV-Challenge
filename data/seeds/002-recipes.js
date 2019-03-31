
exports.seed = function (knex, Promise) {
  return knex('recipes').insert([
    { name: 'five-cheeses', dish_id: 1 },
    { name: 'pepperoni', dish_id: 1 }
  ]);
};
