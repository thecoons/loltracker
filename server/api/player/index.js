'use strict';

var express = require('express');
var controller = require('./player.controller');

var router = express.Router();

//router.get('/', controller.index);
router.get('/find/:region/:name', controller.find);
router.get('/stat/:idPlayer/:regionPlayer',controller.stat)
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;
