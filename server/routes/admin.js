const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const applyController = require('../controllers/job-apply');

const passportJWT = passport.authenticate('jwt', { session: false });


// -----------  Shoppers --------------------
router.route('/jobs/apply')
  .post(passportJWT, applyController.create);

router.route('/jobs/all')
  .get(passportJWT, applyController.all);

router.route('/jobs/resolution/:id')
  .post(passportJWT, applyController.resolution);

module.exports = router;