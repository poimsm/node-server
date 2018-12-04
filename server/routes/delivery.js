const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const jobsController = require('../controllers/jobs');
const shoppersController = require('../controllers/shoppers');
const takeOrderController = require('../controllers/take-order');
const storesController = require('../controllers/stores');
const ordersController = require('../controllers/orders');
const payController = require('../controllers/pay-delivery');


const passportJWT = passport.authenticate('jwt', { session: false });

// -----------  Job  --------------------
router.route('/delivery/job/application')
  .get(passportJWT, jobsController.all);

router.route('/delivery/job/application/create')
  .post(passportJWT, jobsController.application);

router.route('/delivery/job/application/accept')
  .post(passportJWT, jobsController.accept);

// -----------  Shoppers --------------------
router.route('/delivery/shoppers/available')
  .get(passportJWT, shoppersController.available);

router.route('/delivery/shoppers/trigger-register')
  .post(passportJWT, shoppersController.triggerRegister);

router.route('/delivery/shoppers/schedule')
  .post(passportJWT, shoppersController.newSchedule);

router.route('/delivery/shoppers/schedule')
  .put(passportJWT, shoppersController.editSchedule);

// ----------- Stores --------------------
router.route('/delivery/stores')
  .get(passportJWT, storesController.all);

router.route('/delivery/stores/:id')
  .get(passportJWT, storesController.one);

router.route('/delivery/stores')
  .post(passportJWT, storesController.create);

// -----------  Orders status  --------------------

//router.route('/delivery/orders/update')
//  .put(passportJWT, shoppersController.update);

// -----------  Orders  --------------------
router.route('/orders/take')
  .get(passportJWT, takeOrderController.create);

router.route('/orders/available')
  .get(passportJWT, takeOrderController.available);

router.route('/orders/taken')
  .get(passportJWT, takeOrderController.taken);

router.route('/orders/current')
  .get(passportJWT, takeOrderController.current);


////////////////////


router.route('/delivery/orders/active')
  .get(passportJWT, ordersController.active);

router.route('/delivery/orders/:id')
  .get(passportJWT, ordersController.one);

router.route('/delivery/orders')
  .post(passportJWT, ordersController.create);

router.route('/delivery/orders')
  .put(passportJWT, ordersController.update);

// -----------  Payments  --------------------
router.route('/delivery/pay/stores')
  .get(passportJWT, payController.stores);

router.route('/delivery/pay/shoppers')
  .get(passportJWT, payController.shoppers);

router.route('/delivery/pay/stores/:id')
  .get(passportJWT, payController.oneStore);

router.route('/delivery/pay/stores/:id')
  .get(passportJWT, payController.oneShopper);

router.route('/delivery/pay/orders-by-stores')
  .get(passportJWT, payController.ordersByStore);

router.route('/delivery/pay/orders-by-shoppers')
  .get(passportJWT, payController.ordersByShopper);

module.exports = router;