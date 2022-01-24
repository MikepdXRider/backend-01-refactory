const { Router } = require('express');
const Order = require('../models/Order');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const newOrder = await Order.insert({ ...req.body });
    res.json(newOrder);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const order = await Order.getById(id);
    res.json(order);
  })

  .get('/', async (req, res) => {
    const orders = await Order.getAll();
    res.json(orders);
  })

  .patch('/:id', async (req, res, next) => {
    // pull id from request
    const { id } = req.params;
    try {
      // make a query
      const order = await Order.updateById(id, { ...req.body });
      // return the new order object from the update query.
      res.json(order);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    // pull id from request
    const { id } = req.params;
    
    const order = await Order.deleteById(id);

    res.json(order);
  });
