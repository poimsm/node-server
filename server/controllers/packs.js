const JWT = require('jsonwebtoken');
const cloudinary = require("cloudinary");
const Food = require('../models/pack');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
  });


module.exports = {

  create: async (req, res, next) => {

    const body = req.body; 
    const pack = new Pack({
        category: body.category,
        title: body.title,
        price: body.price,
        img: "",
        lists: body.lists,
        isListActive: body.isListActive,
        timestamp: new Date().getTime(),
        user: req.user._id,
        buys: body.buys,
        reviews: body.reviews,
        totalStartsGiven: body.totalStartsGiven,
        sumAllStarts: body.sumAllStarts,
        startsAverage: body.startsAverage
    });

    const img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

    cloudinary.uploader.upload(img, 
        function(result) { 

            pack.img.url = result.url;
            pack.img.id = result.public_id;

            pack.save((err, packDB) => {

                if (err) {
                    return res.status(500).json();
                }        
                res.status(200).json({ packDB });  
        
            });
        });
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