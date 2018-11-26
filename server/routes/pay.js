const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const jobsController = require('../controllers/jobs');
const shoppersController = require('../controllers/shoppers');
const ordersController = require('../controllers/orders');
// const payController = require('../controllers/pay');

const passportJWT = passport.authenticate('jwt', { session: false });

// -----------  Job  --------------------
router.route('job/application')
  .get(passportJWT, jobsController.all);

router.route('job/application/create')
  .post(passportJWT, jobsController.application);

router.route('job/application/accept')
  .post(passportJWT, jobsController.accept);

// -----------  Shopper  --------------------
router.route('shoppers/available')
  .get(passportJWT, shoppersController.available);

router.route('shoppers/trigger-register')
  .post(passportJWT, shoppersController.triggerRegister);

router.route('shoppers/schedule')
  .post(passportJWT, shoppersController.newSchedule);

router.route('shoppers/schedule')
  .put(passportJWT, shoppersController.editSchedule);

// -----------  Orders  --------------------
router.route('orders/active')
  .get(passportJWT, ordersController.active);

router.route('orders/:id')
  .get(passportJWT, ordersController.one);

router.route('orders')
  .post(passportJWT, ordersController.create);

router.route('orders')
  .put(passportJWT, ordersController.update);

// -----------  Payments  --------------------
// router.route('pay/stores')
//   .get(passportJWT, payController.storess);

// router.route('pay/shoppers')
//   .get(passportJWT, payController.shoppers);

// router.route('pay/stores/:id')
//   .get(passportJWT, payController.oneStore);

// router.route('pay/stores/:id')
//   .get(passportJWT, payController.oneShopper);

// router.route('pay/orders-by-stores')
//   .get(passportJWT, payController.ordersByStore);

// router.route('pay/orders-by-shoppers')
//   .get(passportJWT, payController.ordersByShopper);

module.exports = router;