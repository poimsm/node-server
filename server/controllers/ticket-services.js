const JWT = require('jsonwebtoken');
const cloudinary = require("cloudinary");
const Ticket = require('../models/ticket-service');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
  });

uploader = (img) => {
    return new Promise ((resolve, reject) => {
    cloudinary.uploader.upload(img, function(result) { 
        const image = {
            url: result.url,
            id: result.public_id
        };
        resolve(image);
        });
    })   
}

module.exports = {

  create: async (req, res, next) => {

    const body = req.body; 
    const ticket = new Ticket({
        category: body.category,
        title: body.title,
        description: body.description,
        quota: body.quota,
        price: body.price,
        imgs: {},
        initHour: body.initHour,
        endHour: body.endHour,
        site: body.site,
        timestamp: new Date().getTime(),
        user: req.user._id,
        buys: body.initDate,
        reviews: 0,
        totalStartGiven: 0,
        sumOfStarts: 0,
        startsAverage: 0
    });

    const test = {
        0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
        1: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
    }

    const imgs = [];

    Object.keys(body.imgs).forEach( key => {
        imgs.push(body.imgs[key])
    })

    const promises = [];

    for (const img of imgs) {
        promises.push(uploader(img));
      }

    Promise.all(promises).then( uploads => {

        const uploadsObj = {}

        uploads.forEach((upload, i) => {
            uploadsObj[i] = upload
        })
   
        ticket.imgs = uploadsObj;  
    
        ticket.save((err, ticketDB) => {
    
            if (err) {
                return res.status(500).json();
            }        
            res.status(200).json({ ticketDB });  
    
        });    

    })
  },

  all: async (req, res, next) => {

    const desde = req.query.desde || 0;
    const limite = req.query.limite || 2;

    desde = Number(desde);
    limite = Number(limite);

    Ticket.find({})
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

    Ticket.findById(id, (err, ticketDB) => {

        if (err) {
            return res.status(500).json({ err });
        }

        if (!ticketDB) {
            return res.status(400).json({ err: 'El ID no es correcto' });
        }

        res.status(200).json({ ticketDB });

    });
  },

  update: async (req, res, next) => {

    const id = req.params.id;
    const body = req.body; 

    Ticket.findByIdAndUpdate(id, body, (err, ticketDB) => {
        if (err) {
            return res.status(500).json({ err });
        }
        res.status(200).json( {done: true});
    })
  },

  delete: async (req, res, next) => {

    const id = req.params.id;

    Ticket.findByIdAndRemove(id, (err, ticketDB) => {

        if (err) {
            return res.status(500).json({ err });
        }

        if (!ticketDB) {
            return res.status(400).json({err: 'El id no existe' });
        }

        res.status(200).json({ done: true });

    });

  }
}