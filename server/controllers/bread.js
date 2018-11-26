const JWT = require('jsonwebtoken');
const Order = require('../models/order');

module.exports = {

  create: async (req, res, next) => {

    const body = req.body; 
    await Order.create(body);
    res.status(200).json();       
  },

  active: async (req, res, next) => {

    const orders = await Order.find({isActive: true});
    res.status(200).json(orders);
  },

  one: async (req, res, next) => {

    const id = req.params.id;
    const order = await findById(id);
    res.status(200).json(order);
  },

  update: async (req, res, next) => {

    const id = req.params.id;
    const body = req.body;     
    await findByIdAndUpdate(id, body);
    res.status(200).json();
  }
}