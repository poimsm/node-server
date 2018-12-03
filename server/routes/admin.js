const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const jobsController = require('../controllers/job-apply');
const storeApplyController = require('../controllers/store-apply');
const storeController = require('../controllers/stores');

const passportJWT = passport.authenticate('jwt', { session: false });


// -----------  Shoppers --------------------
router.route('/jobs/apply')
  .post(passportJWT, jobsController.create);

router.route('/jobs/all')
  .get(passportJWT, jobsController.all);

router.route('/jobs/resolution/:id')
  .post(passportJWT, jobsController.resolution);


// -----------  Stores --------------------
router.route('/store-category/apply')
  .post(passportJWT, storeApplyController.create);

router.route('/store-category/all')
  .get(passportJWT, storeApplyController.all);




router.route('/store/resolution/:id')
  .post(passportJWT, storeApplyController.resolution);


// -----------  Stores Manage --------------------
router.route('/store/all')
  .get(passportJWT, storeController.all);

router.route('/store/important')
  .get(passportJWT, storeController.important);

router.route('/store/important/:id')
  .post(passportJWT, storeController.mark);


module.exports = router;