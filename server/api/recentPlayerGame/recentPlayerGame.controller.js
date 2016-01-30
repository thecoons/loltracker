'use strict';

var _ = require('lodash');
var https = require('https');
var RecentPlayerGame = require('./recentPlayerGame.model');

// Get list of recentPlayerGames
exports.index = function(req, res) {
  RecentPlayerGame.find(function (err, recentPlayerGames) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(recentPlayerGames);
  });
};

// Get a single recentPlayerGame
exports.show = function(req, res) {
  // RecentPlayerGame.findById(req.params.id, function (err, recentPlayerGame) {
  //   if(err) { return handleError(res, err); }
  //   if(!recentPlayerGame) { return res.status(404).send('Not Found'); }
  //   return res.json(recentPlayerGame);
  // });

  var option = {
    //TODO Gerer l'appel d'api

  };

};

// Creates a new recentPlayerGame in the DB.
exports.create = function(req, res) {
  RecentPlayerGame.create(req.body, function(err, recentPlayerGame) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(recentPlayerGame);
  });
};

// Updates an existing recentPlayerGame in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  RecentPlayerGame.findById(req.params.id, function (err, recentPlayerGame) {
    if (err) { return handleError(res, err); }
    if(!recentPlayerGame) { return res.status(404).send('Not Found'); }
    var updated = _.merge(recentPlayerGame, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(recentPlayerGame);
    });
  });
};

// Deletes a recentPlayerGame from the DB.
exports.destroy = function(req, res) {
  RecentPlayerGame.findById(req.params.id, function (err, recentPlayerGame) {
    if(err) { return handleError(res, err); }
    if(!recentPlayerGame) { return res.status(404).send('Not Found'); }
    recentPlayerGame.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
