const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const controller = require('../controllers/food');
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/food')
  .get(passportJWT, controller.all);

router.route('/food/:id')
  .get(passportJWT, controller.one);

router.route('/food')
  .post(passportJWT, controller.create);

router.route('/food}/:id')
  .put(passportJWT, controller.update);

router.route('/food/:id')
  .delete(passportJWT, controller.delete);

module.exports = router;