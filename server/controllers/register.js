const JWT = require('jsonwebtoken');
const cloudinary = require("cloudinary");
const Model = require('../models/register');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
  });


module.exports = {

  create: async (req, res, next) => {

    const body = req.body; 
    const model = new Model({
        day: body.day,
        one: body.one,
        two: body.two,
        three: body.three,
        four: body.four,
        five: body.five,
        six: body.six,
        seven: body.seven,
        eight: body.eight,
        nine: body.nine,
        ten: body.ten
    });

    model.save((err, data) => {

        if (err) {
            return res.status(500).json();
        }        
        res.status(200).json({ data });  

    });

  },

  all: async (req, res, next) => {

    const day = req.query.day;

    Model.find({})
    .where('day', day)
    .exec((err, data) => {

        if (err) {
            return res.status(500).json({ err  });
        }
        res.status(200).json({ data });
    })
  },

  one: async (req, res, next) => {
    const id = req.params.id;

    Model.findById(id, (err, data) => {

        if (err) {
            return res.status(500).json({ err });
        }

        if (!data) {
            return res.status(400).json({ err: 'El ID no es correcto' });
        }

        res.status(200).json({ data });

    });
  },

  update: async (req, res, next) => {

    const id = req.params.id;
    const body = req.body; 

    Model.findByIdAndUpdate(id, body, (err, delivery) => {
        if (err) {
            return res.status(500).json({ err });
        }
        res.status(200).json( {done: true});
    })
  },

  delete: async (req, res, next) => {

    const id = req.params.id;

    Model.findByIdAndRemove(id, (err, data) => {

        if (err) {
            return res.status(500).json({ err });
        }

        if (!data) {
            return res.status(400).json({err: 'El id no existe' });
        }

        res.status(200).json({ done: true });

    });

  }
}