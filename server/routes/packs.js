const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const controller = require('../controllers/packs');
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/packs')
  .get(passportJWT, controller.all);

router.route('/packs/:id')
  .get(passportJWT, controller.one);

router.route('/packs')
  .post(passportJWT, controller.create);

router.route('/packs/:id')
  .put(passportJWT, controller.update);

router.route('/packs/:id')
  .delete(passportJWT, controller.delete);

module.exports = router;