const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const eventsController = require('../controllers/explore-events');
const servicesController = require('../controllers/explore-services');

const passportJWT = passport.authenticate('jwt', { session: false });

// -----------  Events  --------------------
router.route('/explore/events')
  .get(passportJWT, eventsController.all);

router.route('/explore/events/:id')
  .get(passportJWT, eventsController.one);

router.route('/explore/events')
  .post(passportJWT, eventsController.create);

router.route('/explore/events/:id')
  .put(passportJWT, eventsController.update);

router.route('/explore/events/:id')
  .delete(passportJWT, eventsController.delete);

// -----------  Services  --------------------
router.route('/explore/services')
.get(passportJWT, servicesController.all);

router.route('/explore/services/:id')
.get(passportJWT, servicesController.one);

router.route('/explore/services')
.post(passportJWT, servicesController.create);

router.route('/explore/services/:id')
.put(passportJWT, servicesController.update);

router.route('/explore/services/:id')
.delete(passportJWT, servicesController.delete);

module.exports = router;