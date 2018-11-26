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
    const img = body.img.url;

    data = await cloudinary.uploader.upload(img);    
    body.img = { url: data.url, id: data.public_id }; 

    await coupon.create(body);
    res.status(200).json();
  },

  all: async (req, res, next) => {

    const desde = req.query.desde || 0;
    const limite = req.query.limite || 2;

    desde = Number(desde);
    limite = Number(limite);

    Coupon.find({})
    // .skip(desde)
    // .limit(limite)
    // .sort('category')
    // .populate('user', 'name')
    .exec((err, cupones) => {

        if (err) {
            return res.status(500).json({ err  });
        }
        res.status(200).json({ cupones });
    })
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