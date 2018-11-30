const JWT = require('jsonwebtoken');
const cloudinary = require("cloudinary");
const Eventt = require('../models/explore-event');


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
   
        body.imgs = uploadsObj;
        body.created = new Date().getTime();
        body.user = req.user._id;   
        
        const event = new Eventt(body);
        
        event.save((err, serviceDB) => {
    
            if (err) {
                return res.status(500).json();
            }        
            res.status(200).json();  
    
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