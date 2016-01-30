'use strict';

var _ = require('lodash');
var Player = require('./player.model');
var api_config = require('../../config/apiConfig');
var https = require('https');
var http = require('http');
var fs = require('fs');

// Get list of players
exports.index = function(req, res) {
  Player.find(function (err, players) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(players);
  });
};

// Get a single player
exports.find = function(req, res) {
  // Player.findById(req.params.id, function (err, player) {
  //   if(err) { return handleError(res, err); }
  //   if(!player) { return res.status(404).send('Not Found'); }
  //   return res.json(player);
  // });
  var option = {
    hostname: req.params.region+'.api.pvp.net',
    port: 443,
    path: '/api/lol/'+req.params.region+'/v1.4/summoner/by-name/'+req.params.name+'?api_key='+api_config.api_key,
    method: 'GET'
  };

  console.log('Options =>',option);

  https.request(option,function(result){
    var buf = '';

    result.on('data',function(chunk){
      buf += chunk;
    });

    result.on('end',function(){
      var jsonRes = JSON.parse(buf);
      jsonRes[req.params.name].region = req.params.region;
      console.log('Result Player Query => ',jsonRes);
      return res.json(jsonRes[req.params.name]);
    });

  }).end();
};

exports.stat = function(req,res){
  var option = {
    hostname: req.params.regionPlayer+'.api.pvp.net',
    port: 443,
    path: '/api/lol/'+req.params.regionPlayer+'/v1.3/stats/by-summoner/'+req.params.idPlayer+'/ranked?api_key='+api_config.api_key,
    method: 'GET'
  };

  https.request(option,function(result){
    var buf = '';

    result.on('data',function(chunk){
      buf += chunk;
    });

    result.on('end',function(){
      var jsonRes = JSON.parse(buf);
      console.log('Result Player Query => ',jsonRes);
      return res.json(jsonRes);
    });

  }).end();

};


// Creates a new player in the DB.
exports.create = function(req, res) {
  Player.create(req.body, function(err, player) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(player);
  });
};

// Updates an existing player in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Player.findById(req.params.id, function (err, player) {
    if (err) { return handleError(res, err); }
    if(!player) { return res.status(404).send('Not Found'); }
    var updated = _.merge(player, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(player);
    });
  });
};

// Deletes a player from the DB.
exports.destroy = function(req, res) {
  Player.findById(req.params.id, function (err, player) {
    if(err) { return handleError(res, err); }
    if(!player) { return res.status(404).send('Not Found'); }
    player.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};


function handleError(res, err) {
  return res.status(500).send(err);
}
