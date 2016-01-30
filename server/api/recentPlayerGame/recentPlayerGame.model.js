'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecentPlayerGameSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('RecentPlayerGame', RecentPlayerGameSchema);