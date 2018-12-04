const JWT = require('jsonwebtoken');
const cloudinary = require("cloudinary");

const JobApply = require('../models/job-apply');
const Shopper = require('../models/shopper');
const appMessages = require('./utils/messages');
const appStatus = require('./utils/app-status');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
  });


module.exports = {

  create: async (req,res,next) =>{
    const body = req.body;
    let status = 200; //server
    let statusApp = appStatus.status.ok.code;
    let response = {
      message: appMessages.message.shopper.delivery_request_created , 
      status: statusApp,
      data: body
    };
    
    body.userId = req.user._id;
    body.created = new Date().getTime();    
    //validate if application exists already
    formerApply = await JobApply.findOne({userId: body.userId, isActive: true});
    if (formerApply)
    {      
      response.message =  appMessages.message.shopper.delivery_failed;
      response.status = appStatus.status.unauthorized.code;
      
    }else
    {
      mongoModel = await JobApply.create(body);  
    }
    res.status(status).json(response);

  },
  resolution: async (req, res, next) => {

    let status = 200;
    let statusApp = appStatus.status.ok.code;
    const id = req.params.id;
    const body = req.body;
    let response = {
      message: appMessages.message.shopper.admin_accepted,
      status: statusApp,
      data: body

    };
    const updateJobApply = { isAccepted: body.accepted, isActive:body.accepted }
    const updateShopper = { isActive:body.accepted }
    
    
    let responseModel = await JobApply.findOneAndUpdate({userId: id, isActive:true}, updateJobApply);    
    formerShopper = await Shopper.findOne({userId: id});
    console.log(formerShopper);
    if(! formerShopper)
    {
      const saveShopper = {
          userId : responseModel.userId,
          phone : responseModel.phone,
          name : responseModel.name,
          isActive: body.accepted,  
          isAccepted: body.accepted,        
      };
      mongoModel = await Shopper.create(saveShopper);  
    }else
    {
      
      console.log(updateShopper);
      await Shopper.findOneAndUpdate({userId: id, isActive:true}, updateShopper);    
    }

    //change status,message
    if(! body.accepted)
    {      
      response.message =  appMessages.message.shopper.admin_rejected;
      response.status = appStatus.status.unauthorized.code;
    }
    res.status(status).json(response);
   
  },

  all: async (req, res, next) => {

    let status = 200; //server
    let statusApp = appStatus.status.ok.code;
    let response = {
      data: [],
      message: appStatus.status.ok.description,
      status: statusApp
    }
    const defaultNumberOfRecords = 20;
    const page = req.query.page || 0;    
    const records = req.query.records || defaultNumberOfRecords;
    let pageNumber = 0;
    let numberOfRecords = defaultNumberOfRecords;
    //check inputs is not numeric
    if(! (/^\d+$/.test(page)) )
    {
      pageNumber        = 0;
      numberOfRecords   = 0;
      response.status   = appStatus.status.bad_request.code;
      response.message  = appMessages.message.general.not_a_number;
    }else
    {
      if(Number(page) > 1)
      {
        pageNumber = Number(page)*numberOfRecords;
      }
      numberOfRecords = Number(records);

    }
    const data = await JobApply.find({isActive:true}).skip(pageNumber).limit(numberOfRecords);
    response.data = data;
    res.status(status).json(response);
  }
}