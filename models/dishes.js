const db = require('../data/db');

module.exports = {
  get: (id) => {
    let query = db('dishes');
    if (id) query = query.where({ id });
    return query;
  },
  getRecipes: (id) => db('recipes').where('dish_id', id),
  add: (dish) => db('dishes').insert(dish),
  update: (id, changes) => db('dishes').where({ id }).update(changes),
  remove: (id) => db('dishes').where({ id }).del()
}
