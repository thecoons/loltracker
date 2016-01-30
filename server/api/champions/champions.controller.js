'use strict';

var _ = require('lodash');
var https = require('https');
var api_config = require('../../config/apiConfig');
var Champions = require('./champions.model');

// Get list of championss
exports.index = function(req, res) {
  Champions.find(function (err, championss) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(championss);
  });
};

// Get a single champions
exports.show = function(req, res) {
  // Champions.findById(req.params.id, function (err, champions) {
  //   if(err) { return handleError(res, err); }
  //   if(!champions) { return res.status(404).send('Not Found'); }
  //   return res.json(champions);
  // });
  var option = {
    hostname: 'global.api.pvp.net',
    port: 443,
    path: '/api/lol/static-data/'+req.params.region+'/v1.2/champion/'+req.params.id+'?api_key='+api_config.api_key+'&locale=fr_FR',
    method: 'GET'
  };

  console.log('Options Champions=>',option);

  https.request(option,function(result){
    var buf = '';

    result.on('data',function(chunk){
      buf += chunk;
    });

    result.on('end',function(){
      var jsonRes = JSON.parse(buf);
      console.log('Result Player Query Champions=> ',jsonRes);
      return res.json(jsonRes);
    });

  }).end();
};

// Creates a new champions in the DB.
exports.create = function(req, res) {
  Champions.create(req.body, function(err, champions) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(champions);
  });
};

// Updates an existing champions in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Champions.findById(req.params.id, function (err, champions) {
    if (err) { return handleError(res, err); }
    if(!champions) { return res.status(404).send('Not Found'); }
    var updated = _.merge(champions, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(champions);
    });
  });
};

// Deletes a champions from the DB.
exports.destroy = function(req, res) {
  Champions.findById(req.params.id, function (err, champions) {
    if(err) { return handleError(res, err); }
    if(!champions) { return res.status(404).send('Not Found'); }
    champions.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
