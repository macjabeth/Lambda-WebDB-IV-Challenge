const Joi = require('joi');
const debug = require('debug')('server:db');
const router = require('express').Router();
const dishDB = require('../models/dishes');

// Validation
const schema = Joi.object().keys({
  name: Joi.string().required()
});

// C - POST
router.post('/', async ({ body: newDish }, res) => {
  const { error } = Joi.validate(newDish, schema);
  if (error) return res.status(400).json({
    error: error.details[0].message
  });

  try {
    const [id] = await dishDB.add(newDish);
    const [dish] = await dishDB.get(id);
    res.status(201).json(dish);
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'There was an error while adding the new dish.'
    });
  }
});

// R - GET
router.get('/', async (req, res) => {
  try {
    const dishes = await dishDB.get();
    res.status(200).json(dishes);
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'The dishes could not be retrieved.'
    });
  }
});

router.get('/:id', async ({ params: { id } }, res) => {
  try {
    const [dish] = await dishDB.get(id);
    Boolean(dish)
      ? res.status(200).json(dish)
      : res.status(404).json({ error: 'The specified dish could not be retrieved.' });
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'The specified dish could not be retrieved.'
    });
  }
});

router.get('/:id/recipes', async ({ params: { id } }, res) => {
  try {
    const recipes = await dishDB.getRecipes(id);
    Boolean(recipes.length)
      ? res.status(200).json(recipes)
      : res.status(404).json({ error: 'No dish recipes could be retrieved.' })
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'The dish recipes could not be retrieved.'
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
    const count = await dishDB.update(id, changes);
    Boolean(count)
      ? res.status(200).json({ count })
      : res.status(404).json({ error: 'The specified dish could not be modified.' });
  } catch (error) {
    debug(error); res.status(404).json({
      error: 'The specified dish could not be modified.'
    });
  }
});

// D - DELETE
router.delete('/:id', async ({ params: { id } }, res) => {
  try {
    const count = await dishDB.remove(id);
    Boolean(count)
      ? res.status(204).end()
      : res.status(404).json({ error: 'The specified dish could not be removed.' });
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'The specified dish could not be removed.'
    });
  }
});

module.exports = router;
