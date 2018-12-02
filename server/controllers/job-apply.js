const JWT = require('jsonwebtoken');
const cloudinary = require("cloudinary");

const JobApply = require('../models/job-apply');
const messages = require('./messages');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
  });


module.exports = {

  create: async (req,res,next) =>{
    const body = req.body;
    let response = {'message':messages.message.shooper.delivery_request_created};
    let status = 200;
    
    body.userId = req.user._id;
    body.create = 2;
    body.isActive = false;
    //validate if application exists already
    formerApply = await JobApply.findOne({userId: body.userId});
    if (formerApply){
      status = 401;
      response = {'message':messages.message.shooper.delivery_failed};
    }else{
      mongoModel = await JobApply.create(body);  
    }
    res.status(status).json(response);

  },
  accept: async (req, res, next) => {

    let status = 200;
    const id = req.params.id;
    const body = req.body;
    let message = "hola";
    const update = { isActive: true }

    await JobApply.findOneAndUpdate({userId: id}, update);
    

    res.status(status).json(message);
   
  },

  all: async (req, res, next) => {

    let status = 200;
    const defaultNumberOfRecords = 20;
    const page = req.query.page || 1;    
    const records = req.query.records || defaultNumberOfRecords;
    let pageNumber = 1;
    let numberOfRecords = defaultNumberOfRecords;
    //check inputs is not numeric
    if(! (/^\d+$/.test(page)) ){
      status = 400;
      pageNumber=1;
      numberOfRecords=0;
    }else{
      if(Number(page) > 1){
        pageNumber = Number(page)*numberOfRecords;
      }
      numberOfRecords = Number(records);

    }
    const data = await JobApply.find().skip(pageNumber).limit(numberOfRecords);
    res.status(status).json(data);
  }
}