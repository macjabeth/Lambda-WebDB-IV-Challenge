
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('dishes', (tbl) => {
      tbl.increments();
      tbl.string('name').notNullable().unique();
      tbl.timestamp('createdAt').defaultTo(knex.fn.now());
    })
    .createTable('recipes', (tbl) => {
      tbl.increments();
      tbl.integer('dish_id').unsigned().notNullable()
        .references('id').inTable('dishes');
      tbl.string('name').notNullable().unique();
      tbl.string('instructions')
      tbl.timestamp('createdAt').defaultTo(knex.fn.now());
    })
    .createTable('ingredients', (tbl) => {
      tbl.increments();
      tbl.string('name').notNullable().unique();
      tbl.float('quantity').unsigned().defaultTo(1);
      tbl.timestamp('createdAt').defaultTo(knex.fn.now());
    })
    .createTable('recipe_ingredients', (tbl) => {
      tbl.integer('recipe_id').unsigned().notNullable()
        .references('id').inTable('recipes');
      tbl.integer('ingredient_id').unsigned().notNullable()
        .references('id').inTable('ingredients');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('recipe_ingredients')
    .dropTableIfExists('dishes')
    .dropTableIfExists('recipes')
    .dropTableIfExists('ingredients');
};
