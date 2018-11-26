const JWT = require('jsonwebtoken');

const Order = require('../models/order');
const Shopper = require('../models/shopper');
const Store = require('../models/store');


module.exports = {

  stores: async (req, res, next) => {

    const desde = req.query.desde || 0;
    const limite = req.query.limite || 5;

    desde = Number(desde);
    limite = Number(limite);

    const data = await Store.find().skip(desde).limit(limite);
    res.status(200).json(data);
  },

  oneStore: async (req, res, next) => {

    const id = req.params.id;
    const data = await Store.findById(id);
    res.status(200).json(data);
  },

  shoppers: async (req, res, next) => {

    const desde = req.query.desde || 0;
    const limite = req.query.limite || 5;

    desde = Number(desde);
    limite = Number(limite);

    const data = await Shopper.find().skip(desde).limit(limite);
    res.status(200).json(data);
  },

  oneShopper: async (req, res, next) => {

    const id = req.params.id;
    const data = await Shopper.findById(id);
    res.status(200).json(data);
  },

  ordersByStore: async (req, res, next) => {

    const desde = req.query.desde || 0;
    const limite = req.query.limite || 5;

    desde = Number(desde);
    limite = Number(limite);

    const data = await Order.find().skip(desde).limit(limite).sort('storeName');
    res.status(200).json(data);
  },

  ordersByShopper: async (req, res, next) => {

    const desde = req.query.desde || 0;
    const limite = req.query.limite || 5;

    desde = Number(desde);
    limite = Number(limite);

    const data = await Order.find().skip(desde).limit(limite).sort('shopperName');
    res.status(200).json(data);
  }
}