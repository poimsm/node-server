const JWT = require('jsonwebtoken');
const cloudinary = require("cloudinary");

const Store = require('../models/store');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
  });


module.exports = { 

  all: async (req, res, next) => {

    const desde = req.query.desde || 0;
    const limite = req.query.limite || 5;

    desde = Number(desde);
    limite = Number(limite);

    const data = await Store.find().skip(desde).limit(limite);
    res.status(200).json(data);
  },

  one: async (req, res, next) => {

    const id = req.params.id;
    const store = await Store.findById(id);
    res.status(200).json(store);
  },

  create: async (req, res, next) => {

    const body = req.body; 
    await Store.create(body);
    res.status(200).json();       
  },
}