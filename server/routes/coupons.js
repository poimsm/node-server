const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const controller = require('../controllers/coupons');
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/coupons')
  .get(passportJWT, controller.all);

router.route('/coupons/:id')
  .get(passportJWT, controller.one);

router.route('/coupons')
  .post(passportJWT, controller.create);

router.route('/coupons/:id')
  .put(passportJWT, controller.update);

router.route('/coupons/:id')
  .delete(passportJWT, controller.delete);

module.exports = router;