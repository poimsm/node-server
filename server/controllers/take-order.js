const JWT = require('jsonwebtoken');
const cloudinary = require("cloudinary");

const TakeOrder = require('../models/take-order');
const Shopper = require('../models/shopper');
const appMessages = require('./utils/messages');
const appStatus = require('./utils/app-status');
const deliveryStatus = require('./utils/delivery-status');


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
    
    let shopper = await Shopper.find({userId:req.user._id});
    body.shopper = shopper._id;
    body.order = body.orderId;
    body.created = new Date().getTime();    
    //validate if an order exists already
    formerTakeOrder = await TakeOrder.findOne({
      shopper: shopper._id, 
      order: body.orderId, 
      isActive: true});

    if (formerTakeOrder)
    {      
      response.message =  appMessages.message.shopper.delivery_failed;
      response.status = appStatus.status.unauthorized.code;
      
    }else
    {
      mongoModel = await TakeOrder.create(body);  
    }
    res.status(status).json(response);

  },
  current: async (req, res, next) => {

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
    let shopper = await Shopper.find({userId:req.user._id});

    const data = await TakeOrder.find({
            isActive:true, 
            status: deliveryStatus.status.pending.code,
            shopper: shopper._id
            
      })
      .populate('shopper','name phone')
      .populate('order','clientName clientAddress clientPhone hour price')
      .skip(pageNumber).limit(numberOfRecords);
    response.data = data;
    res.status(status).json(response);
  },
  taken: async (req, res, next) => {

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
    let shopper = await Shopper.find({userId:req.user._id});

    const data = await TakeOrder.find({
            isActive:true, 
            status: deliveryStatus.status.completed.code,
            shopper: shopper._id
      })
      .populate('shopper','name phone')
      .populate('order','clientName clientAddress clientPhone hour price')
      .skip(pageNumber).limit(numberOfRecords);
    response.data = data;
    res.status(status).json(response);
  },
  available: async (req, res, next) => {

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
    const data = await Order.find({
                isActive:true, 
                status: deliveryStatus.status.entry.code
              }).skip(pageNumber).limit(numberOfRecords);
    response.data = data;
    res.status(status).json(response);
  }
}