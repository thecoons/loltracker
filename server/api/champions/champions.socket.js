/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Champions = require('./champions.model');

exports.register = function(socket) {
  Champions.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Champions.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('champions:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('champions:remove', doc);
}