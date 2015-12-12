var db = require('../../server/db/db_config.js');
var Promise = require('bluebird');
var request = require('request');
var _ = require('underscore');

// create a  user
var createUser = function (user) {
  db.User.create(user)
  .then(function (result) {
    return result;
  })
  .catch(function (error) {
    console.log('Error creating new user:', error);
  });
};