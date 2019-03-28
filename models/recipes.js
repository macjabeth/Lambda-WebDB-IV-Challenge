const db = require('../data/db');

module.exports = {
  get: () => {
    return db({ r: 'recipes', dr: 'dish_recipes', d: 'dishes' })
      .select('r.name', 'd.name')
      .where({
        ['r.id']: 'dr.recipe_id',
        ['d.id']: 'dr.dish_id'
      });
  },

  add: (recipe) => db('recipes').insert(recipe),

  update: (id, recipe) => db('recipes').where({ id }).update(recipe),

  remove: (id) => db('recipes').where({ id }).del()
}
