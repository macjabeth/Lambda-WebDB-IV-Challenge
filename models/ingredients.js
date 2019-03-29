const db = require('../data/db');

module.exports = {
  get: (id) => {
    let query = db('ingredients');
    if (id) query = query.where({ id });
    return query;
  },
  getByRecipe: (id) => {
    return db('recipe_ingredients as ri')
      .join('ingredients as i', 'i.id', 'ri.ingredient_id')
      .where('ri.recipe_id', id)
      .select({ name: 'i.name', quantity: 'i.quantity' });
  },
  add: (ingredient) => db('ingredients').insert(ingredient),
  update: (id, changes) => db('ingredients').where({ id }).update(changes),
  remove: (id) => db('ingredients').where({ id }).del()
}
