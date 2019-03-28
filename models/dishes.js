const db = require('../data/db');

module.exports = {
  get: (id) => {
    let query = db('dishes');

    if (id) query = query.where({ id }).first();

    return query;
  },

  add: (dish) => db('dishes').insert(dish),

  update: (id, dish) => db('dishes').where({ id }).update(dish),

  remove: (id) => db('dishes').where({ id }).del();
}
