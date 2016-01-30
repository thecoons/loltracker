/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var RecentPlayerGame = require('./recentPlayerGame.model');

exports.register = function(socket) {
  RecentPlayerGame.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  RecentPlayerGame.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('recentPlayerGame:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('recentPlayerGame:remove', doc);
}