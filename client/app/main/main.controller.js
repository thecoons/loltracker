'use strict';

angular.module('lolTrackerApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    // $scope.awesomeThings = [];
    $scope.playerResult = {};

    // $http.get('/api/things').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    //   socket.syncUpdates('thing', $scope.awesomeThings);
    // });

    $scope.$on('findPlayer',function(event,arg){
      $scope.playerResult = arg;
    });
    // $scope.addThing = function() {
    //   if($scope.newThing === '') {
    //     return;
    //   }
    //   $http.post('/api/things', { name: $scope.newThing });
    //   $scope.newThing = '';
    // };
    //
    // $scope.deleteThing = function(thing) {
    //   $http.delete('/api/things/' + thing._id);
    // };
    //
    // $scope.$on('$destroy', function () {
    //   socket.unsyncUpdates('thing');
    // });
  });
