const JWT = require('jsonwebtoken');
const cloudinary = require("cloudinary");

const Register = require('../models/register');
const Shopper = require('../models/shopper');
const Schedule = require('../models/schedule');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
  });


module.exports = { 

  takeOrder: async (req, res, next) => {

  },
  available: async (req, res, next) => {

   const day = req.query.day;
   const data = await Register.find({day});
   res.status(200).json(data);

  },

  all: async (req, res, next) => {

    const desde = req.query.desde || 0;
    const limite = req.query.limite || 2;

    desde = Number(desde);
    limite = Number(limite);

    Shopper.find()
    .skip(desde)
    .limit(limite)
    .exec((err, data) => {

        if (err) {
            return res.status(500).json({ err  });
        }
        res.status(200).json({ data });
    })
  },

  one: async (req, res, next) => {
    const id = req.params.id;

    Shopper.findById(id, (err, data) => {

        if (err) {
            return res.status(500).json({ err });
        }

        if (!data) {
            return res.status(400).json({ err: 'El ID no es correcto' });
        }

        res.status(200).json({ data });

    });
  },

  newSchedule: async (req, res, next) => {

    const body = req.body; 

    const schedule = new Schedule(body);
    
    await schedule.save();

    const query = {'day': body.day};    
    const register = await Register.findOne(query);

    const hours = [];    
    Object.values(schedule.hours).forEach(data => hours.push(data))

    const hoursDB = [];
    Object.values(register.hours).forEach(data => hoursDB.push(data))

    const sum = [];
    hours.forEach((data, i) => {
        sum.push(hours[i] + hoursDB[i])
    })    

    await Register.findOneAndUpdate(query, {hours: sum});
    res.status(200).json();

  },

  editSchedule: async (req, res, next) => {

    const id = req.params.id;
    const body = req.body;
    
    await Schedule.findOneAndUpdate({shopperId: id}, body);

    const query = {'day': body.day};    
    const register = await Register.findOne(query);

    const hours = [];    
    Object.values(schedule.hours).forEach(data => hours.push(data))

    const hoursDB = [];
    Object.values(register.hours).forEach(data => hoursDB.push(data))

    const sum = [];
    hours.forEach((data, i) => {
        sum.push(hours[i] + hoursDB[i])
    })    

    await Register.findOneAndUpdate(query, {hours: sum});
    res.status(200).json();

  },

  triggerRegister: async (req, res, next) => {

    const id = req.params.id;

  }
}