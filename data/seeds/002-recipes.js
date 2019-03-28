
exports.seed = function (knex, Promise) {
  return knex('recipes').insert([
    { name: 'five-cheeses' },
    { name: "pepperoni" }
  ]);
};
