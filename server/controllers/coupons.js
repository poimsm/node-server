const JWT = require('jsonwebtoken');
const cloudinary = require("cloudinary");
const Coupon = require('../models/coupon');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
  });


module.exports = {

  create: async (req, res, next) => {

    const body = req.body;
    const img = body.img;    

    data = await cloudinary.uploader.upload(img);    
    body.img = { url: data.url, id: data.public_id };

    body.created = new Date().getTime();
    body.user = req.user._id; 

    await Coupon.create(body);
    res.status(200).json();
  },

  all: async (req, res, next) => {

    let skip = req.query.skip;
    let limite = req.query.limite;
    let category = req.query.category;

    skip = Number(skip);
    limite = Number(limite);

    let filter = {};

    category == 'Destacado'? filter = { destacado: true } : filter = { category };

    const data = await Coupon.find(filter).skip(skip).limit(limite);

    res.status(200).json(data);
  },

  one: async (req, res, next) => {
    const id = req.params.id;

    Coupon.findById(id, (err, cuponDB) => {

        if (err) {
            return res.status(500).json({ err });
        }

        if (!cuponDB) {
            return res.status(400).json({ err: 'El ID no es correcto' });
        }

        res.status(200).json({ cuponDB });

    });
  },

  update: async (req, res, next) => {

    const id = req.params.id;
    const body = req.body; 

    Coupon.findByIdAndUpdate(id, body, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({ err });
        }
        res.status(200).json( {done: true});
    })
  },

  delete: async (req, res, next) => {

    const id = req.params.id;

    Coupon.findByIdAndRemove(id, (err, couponDB) => {

        if (err) {
            return res.status(500).json({ err });
        }

        if (!couponDB) {
            return res.status(400).json({err: 'El id no existe' });
        }

        res.status(200).json({ done: true });

    });

  }
}