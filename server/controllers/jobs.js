const JWT = require('jsonwebtoken');
const cloudinary = require("cloudinary");

const Application = require('../models/application');
const Shopper = require('../models/shopper');



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
  });


module.exports = {

  application: async (req, res, next) => {

    const body = req.body; 
    await Application.create(body);

    res.status(200).json();

  },

  accept: async (req, res, next) => {

    const id = req.params.id;
    const body = req.body;

    const update = { isActive: true }

    await Application.findOneAndUpdate({userId: id}, update);

    await shopper.create(body);

    res.status(200).json();
   
  },

  all: async (req, res, next) => {

    const desde = req.query.desde || 0;
    const limite = req.query.limite || 5;

    desde = Number(desde);
    limite = Number(limite);

    const data = await Application.find().skip(desde).limit(limite);
    res.status(200).json(data);
  }
}