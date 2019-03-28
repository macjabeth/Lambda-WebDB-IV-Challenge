
exports.seed = function (knex, Promise) {
  return knex('dish_recipes').insert([
    { dish_id: 1, recipe_id: 1 },
    { dish_id: 1, recipe_id: 2 }
  ]);
};
