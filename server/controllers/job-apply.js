const JWT = require('jsonwebtoken');
const cloudinary = require("cloudinary");

const JobApply = require('../models/job-apply');
const Shopper = require('../models/shopper');
const messages = require('./messages');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
  });


module.exports = {

  create: async (req,res,next) =>{
    const body = req.body;
    let status = 200; //server
    let statusApp = 200;
    let response = {
      message:messages.message.shopper.delivery_request_created , 
      status: statusApp,
      data: body
    };
    
    body.userId = req.user._id;
    body.create = time();    
    //validate if application exists already
    formerApply = await JobApply.findOne({userId: body.userId});
    if (formerApply){      
      response.message =  message:messages.message.shopper.delivery_failed;
      response.status = 401;
      
    }else{
      mongoModel = await JobApply.create(body);  
    }
    res.status(status).json(response);

  },
  resolution: async (req, res, next) => {

    let status = 200;
    let statusApp = 200;
    const id = req.params.id;
    const body = req.body;
    let response = {
      message: messages.message.shopper.admin_accepted,
      status: statusApp,
      data: body

    };
    const updateJobApply = { isAccepted: body.accepted, isActive:body.accepted }
    const updateShopper = { isActive:body.accepted }
    if(! body.accepted){      
      response.message =  messages.message.shopper.admin_rejected;
      response.status = 401;
    }
    responseModel = await JobApply.findOneAndUpdate({userId: id}, updateJobApply);
    if (body.accepted){
      console.log(responseModel);
      formerShopper = await Shopper.findOne({userId: body.userId});
      console.log(formerShopper);
      if(! formerShopper){
        let saveShopper = {
          userId : responseModel.userId,
          phone : responseModel.phone,
          name : responseModel.name,
          isActive: body.accepted
        };
        mongoModel = await Shopper.create(saveShopper);  
      }else{
        await Shopper.findOneAndUpdate({userId: id}, updateShopper);    
      }

    }
    

    res.status(status).json(response);
   
  },

  all: async (req, res, next) => {

    let status = 200;
    let statusApp = 200;
    let response = {
      data: [],
      message: 'OK'
      status: statusApp
    }
    const defaultNumberOfRecords = 20;
    const page = req.query.page || 1;    
    const records = req.query.records || defaultNumberOfRecords;
    let pageNumber = 1;
    let numberOfRecords = defaultNumberOfRecords;
    //check inputs is not numeric
    if(! (/^\d+$/.test(page)) ){
      pageNumber=1;
      numberOfRecords=0;
      response.status = 400;
      response.message = 'No numeric value';
    }else{
      if(Number(page) > 1){
        pageNumber = Number(page)*numberOfRecords;
      }
      numberOfRecords = Number(records);

    }
    const data = await JobApply.find().skip(pageNumber).limit(numberOfRecords);
    response.data = data;
    res.status(status).json(response);
  }
}