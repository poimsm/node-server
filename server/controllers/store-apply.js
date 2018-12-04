const JWT = require('jsonwebtoken');
const cloudinary = require("cloudinary");

const StoreApply = require('../models/store-apply');
const Store = require('../models/store');
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
      message: appMessages.message.store.delivery_request_created , 
      status: statusApp,
      data: body
    };
    
    body.userId = req.user._id;
    body.created = new Date().getTime();    
    //validate if application exists already
    formerApply = await StoreApply.findOne({userId: body.userId, isActive: true});
    if (formerApply)
    {      
      response.message =  appMessages.message.store.delivery_failed;
      response.status = appStatus.status.unauthorized.code;
      
    }else
    {
      mongoModel = await StoreApply.create(body);  
    }
    res.status(status).json(response);

  },
  resolution: async (req, res, next) => {

    let status = 200;
    let statusApp = appStatus.status.ok.code;
    const id = req.params.id;
    const body = req.body;
    let response = {
      message: appMessages.message.store.admin_accepted,
      status: statusApp,
      data: body

    };
    const updateStoreApply = { isAccepted: body.accepted, isActive:body.accepted }
    const updateStore = { isActive:body.accepted }
    
    
    let responseModel = await StoreApply.findOneAndUpdate({userId: id, isActive:true}, updateStoreApply);    
    formerStore = await Store.findOne({userId: id});
    console.log(formerStore);
    if(! formerStore)
    {
      const saveStore = {
          userId : responseModel.userId,
          phone : responseModel.phone,
          name : responseModel.name,
          category: responseModel.category,
          isActive: body.accepted,  
          isAccepted: body.accepted,        
      };
      mongoModel = await Store.create(saveStore);  
    }else
    {
      
      console.log(updateStore);
      await Store.findOneAndUpdate({userId: id, isActive:true}, updateStore);    
    }

    //change status,message
    if(! body.accepted)
    {      
      response.message =  appMessages.message.store.admin_rejected;
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
    const data = await StoreApply.find({isActive:true}).skip(pageNumber).limit(numberOfRecords);
    response.data = data;
    res.status(status).json(response);
  }
}