const db = require('../data/db');
const ingrDB = require('./ingredients');

module.exports = {
  get: async (id) => {
    let query =  db('recipes as r')
      .join('dishes as d', 'r.dish_id', 'd.id')
      .select({
        id: 'r.id', recipeName: 'r.name',
        dishName: 'd.name', instructions: 'r.instructions',
        createdAt: 'r.createdAt' });

    if (id) query = query.where('r.id', id);

    const recipes = await query;

    for (const recipe of recipes) {
      recipe.ingredients = await ingrDB.getByRecipe(recipe.id);
    }

    return recipes;
  },
  add: (recipe) => db('recipes').insert(recipe),
  update: (id, changes) => db('recipes').where({ id }).update(changes),
  remove: (id) => db('recipes').where({ id }).del()
}
