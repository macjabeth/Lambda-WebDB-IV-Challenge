const db = require('../data/db');

module.exports = {
  get: () => {
    return db('recipes')
      .join('dishes', 'recipes.dish_id', 'dishes.id')
      .select({ recipe: 'recipes.name', dish: 'dishes.name'})
  },

  add: (recipe) => db('recipes').insert(recipe),

  update: (id, recipe) => db('recipes').where({ id }).update(recipe),

  remove: (id) => db('recipes').where({ id }).del()
}
