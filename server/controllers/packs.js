const JWT = require('jsonwebtoken');
const cloudinary = require("cloudinary");
const Pack = require('../models/pack');


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

    await Pack.create(body);
    res.status(200).json();
  },

  all: async (req, res, next) => {

    const desde = req.query.desde || 0;
    const limite = req.query.limite || 2;

    desde = Number(desde);
    limite = Number(limite);

    Pack.find({})
    // .skip(desde)
    // .limit(limite)
    // .sort('category')
    // .populate('user', 'name')
    .exec((err, packs) => {

        if (err) {
            return res.status(500).json({ err  });
        }
        res.status(200).json({ packs });
    })
  },

  one: async (req, res, next) => {
    const id = req.params.id;

    Pack.findById(id, (err, packDB) => {

        if (err) {
            return res.status(500).json({ err });
        }

        if (!packDB) {
            return res.status(400).json({ err: 'El ID no es correcto' });
        }

        res.status(200).json({ packDB });

    });
  },

  update: async (req, res, next) => {

    const id = req.params.id;
    const body = req.body; 

    Pack.findByIdAndUpdate(id, body, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({ err });
        }
        res.status(200).json( {done: true});
    })
  },

  delete: async (req, res, next) => {

    const id = req.params.id;

    Pack.findByIdAndRemove(id, (err, packDB) => {

        if (err) {
            return res.status(500).json({ err });
        }

        if (!packDB) {
            return res.status(400).json({err: 'El id no existe' });
        }

        res.status(200).json({ done: true });

    });

  }
}