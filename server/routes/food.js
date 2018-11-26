const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const endPoint = 'food';
const controller = require('../controllers/food');
const passportJWT = passport.authenticate('jwt', { session: false });

router.route(endPoint)
  .get(passportJWT, controller.all);

router.route(`/${endPoint}/:id`)
  .get(passportJWT, controller.one);

router.route(endPoint)
  .post(passportJWT, controller.create);

router.route(`/${endPoint}/:id`)
  .put(passportJWT, controller.update);

router.route(`/${endPoint}/:id`)
  .delete(passportJWT, controller.delete);

module.exports = router;