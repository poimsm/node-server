const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const applyController = require('../controllers/job-apply');

const passportJWT = passport.authenticate('jwt', { session: false });


// -----------  Shoppers --------------------
router.route('/jobs/apply')
  .post(passportJWT, applyController.create);

router.route('/jobs/all')
  .post(passportJWT, applyController.all);


module.exports = router;