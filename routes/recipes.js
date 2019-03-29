const Joi = require('joi');
const debug = require('debug')('server:db');
const router = require('express').Router();
const recipeDB = require('../models/recipes');
const dishDB = require('../models/dishes');

// Validation
const schema = Joi.object().keys({
  name: Joi.string().required(),
  dish_id: Joi.number().integer().required(),
  instructions: Joi.string()
});

// C - POST
router.post('/', async ({ body: newRecipe }, res) => {
  const { error } = Joi.validate(newRecipe, schema);
  if (error) return res.status(400).json({
    error: error.details[0].message
  });

  try {
    const [dish] = await dishDB.get(newRecipe.dish_id);
    if (Boolean(dish)) {
      const [id] = await recipeDB.add(newRecipe);
      const [recipe] = await recipeDB.get(id);
      res.status(201).json(recipe);
    } else {
      res.status(404).json({ error: 'There was an error while adding the new recipe. ' });
    }
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'There was an error while adding the new recipe.'
    });
  }
});

// R - GET
router.get('/', async (req, res) => {
  try {
    const recipes = await recipeDB.get();
    res.status(200).json(recipes);
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'The recipes could not be retrieved.'
    });
  }
});

router.get('/:id', async ({ params: { id } }, res) => {
  try {
    const [recipe] = await recipeDB.get(id);
    Boolean(recipe)
      ? res.status(200).json(recipe)
      : res.status(404).json({ error: 'The specified recipe could not be retrieved.' });
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'The specified recipe could not be retrieved.'
    });
  }
});

// U - PUT
router.put('/:id', async ({ params: { id }, body: changes }, res) => {
  const { error } = Joi.validate(changes, schema);
  if (error) return res.status(400).json({
    error: error.details[0].message
  });

  try {
    const [dish] = await dishDB.get(changes.dish_id);
    if (Boolean(dish)) {
      const count = await recipeDB.update(id, changes);
      Boolean(count)
        ? res.status(200).json({ count })
        : res.status(404).json({ error: 'The specified recipe could not be modified.' });
    } else {
      res.status(404).json({ error: 'The specified recipe could not be modified.' });
    }
  } catch (error) {
    debug(error); res.status(404).json({
      error: 'The specified recipe could not be modified.'
    });
  }
});

// D - DELETE
router.delete('/:id', async ({ params: { id } }, res) => {
  try {
    const count = await recipeDB.remove(id);
    Boolean(count)
      ? res.status(204).end()
      : res.status(404).json({ error: 'The specified recipe could not be removed.' });
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'The specified recipe could not be removed.'
    });
  }
});

module.exports = router;
