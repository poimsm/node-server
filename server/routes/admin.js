const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const jobsController = require('../controllers/job-apply');
const storeController = require('../controllers/store-apply');

const passportJWT = passport.authenticate('jwt', { session: false });


// -----------  Shoppers --------------------
router.route('/jobs/apply')
  .post(passportJWT, jobsController.create);

router.route('/jobs/all')
  .get(passportJWT, jobsController.all);

router.route('/jobs/resolution/:id')
  .post(passportJWT, jobsController.resolution);


// -----------  Stores --------------------
router.route('/store/apply')
  .post(passportJWT, storeController.create);

router.route('/store/all')
  .get(passportJWT, storeController.all);

router.route('/store/resolution/:id')
  .post(passportJWT, storeController.resolution);

module.exports = router;