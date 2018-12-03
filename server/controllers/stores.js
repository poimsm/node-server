const JWT = require('jsonwebtoken');
const cloudinary = require("cloudinary");

const Store = require('../models/store');
const StoreImportant = require('../models/store-important');
const appMessages = require('./utils/messages');
const appStatus = require('./utils/app-status');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
  });


module.exports = { 

  create: async (req, res, next) => {

    const body = req.body;
    await Store.create(body);
    res.status(200).json();
  },
  all: async (req, res, next) => {

    let status        = 200; //server
    let statusApp     = appStatus.status.ok.code;
    let response      = {
      data: [],
      message: appStatus.status.ok.description,
      status: statusApp
    }
    const defaultNumberOfRecords = 20;
    const page          = req.query.page || 0;    
    const records       = req.query.records || defaultNumberOfRecords;
    let pageNumber      = 0;
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
        pageNumber      = Number(page)*numberOfRecords;
      }
      numberOfRecords   = Number(records);

    }
    const data          = await Store.find({isActive:true}).skip(pageNumber).limit(numberOfRecords);
    response.data       = data;
    res.status(status).json(response);
  },

  one: async (req, res, next) => {

    let status          = 200; //server
    const id            = req.params.id;
    const store         = await Store.findById(id);
    res.status(status).json(store);
  },


  mark: async (req, res, next) => {

    let status          = 200; //server
    const id            = req.params.id;
    const body          = req.body; 
    let statusApp     = appStatus.status.ok.code;
    let response      = {
      data: [],
      message: appStatus.status.ok.description,
      status: statusApp
    }
    const marked        = {
      storeId: id,
      created: new Date().getTime(),
      mark: body.mark
    }
    const updateStoreImp = {
      mark: body.mark
    }
    formerStore = await StoreImportant.findOne({storeId: id, isActive: true});
    if(! formerStore){
      await StoreImportant.create(marked);
    }else{
      let responseModel = await StoreImportant.findOneAndUpdate({storeId: id}, updateStoreImp);
      response.data = marked;
    }
    res.status(status).json(response);
  },
  
  important: async (req, res, next) => {

    let status          = 200; //server
    let statusApp       = appStatus.status.ok.code;
    let response        = {
      data: [],
      message: appStatus.status.ok.description,
      status: statusApp
    }
    const defaultNumberOfRecords = 20;
    const page          = req.query.page || 0;    
    const records       = req.query.records || defaultNumberOfRecords;
    let pageNumber      = 0;
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
        pageNumber      = Number(page)*numberOfRecords;
      }
      numberOfRecords   = Number(records);

    }
    const data          = await Store.find({isActive:true}).skip(pageNumber).limit(numberOfRecords);
    response.data       = data;
    res.status(status).json(response);    
  },

}