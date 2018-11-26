const JWT = require('jsonwebtoken');
const cloudinary = require("cloudinary");
const Food = require('../models/food');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
  });


module.exports = {

  create: async (req, res, next) => {

    const body = req.body; 
    const food = new Food({
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

            food.img.url = result.url;
            food.img.id = result.public_id;

            food.save((err, foodDB) => {

                if (err) {
                    return res.status(500).json();
                }        
                res.status(200).json({ foodDB });  
        
            });
        });
  },

  all: async (req, res, next) => {

    const desde = req.query.desde || 0;
    const limite = req.query.limite || 2;

    desde = Number(desde);
    limite = Number(limite);

    Food.find({})
    // .skip(desde)
    // .limit(limite)
    // .sort('category')
    // .populate('user', 'name')
    .exec((err, food) => {

        if (err) {
            return res.status(500).json({ err  });
        }
        res.status(200).json({ food });
    })
  },

  one: async (req, res, next) => {
    const id = req.params.id;

    Food.findById(id, (err, foodDB) => {

        if (err) {
            return res.status(500).json({ err });
        }

        if (!foodDB) {
            return res.status(400).json({ err: 'El ID no es correcto' });
        }

        res.status(200).json({ foodDB });

    });
  },

  update: async (req, res, next) => {

    const id = req.params.id;
    const body = req.body; 

    Food.findByIdAndUpdate(id, body, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({ err });
        }
        res.status(200).json( {done: true});
    })
  },

  delete: async (req, res, next) => {

    const id = req.params.id;

    Food.findByIdAndRemove(id, (err, foodDB) => {

        if (err) {
            return res.status(500).json({ err });
        }

        if (!foodDB) {
            return res.status(400).json({err: 'El id no existe' });
        }

        res.status(200).json({ done: true });

    });

  }
}