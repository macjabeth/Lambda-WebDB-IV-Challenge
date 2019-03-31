
exports.seed = function (knex, Promise) {
  return knex('ingredients').insert([
    { name: 'tomato sauce' },
    { name: 'mozerella cheese' },
    { name: 'asiago cheese' },
    { name: 'parmesan cheese' },
    { name: 'fontina cheese' },
    { name: 'provolone cheese' },
    { name: 'pepperoni' }
  ]);
};
