'use strict';

angular.module('lolTrackerApp')
  .controller('PlayerSelectCtrl', function ($http,$scope,$rootScope) {
    $scope.formulaire = {
      region: 'euw',
      playerQueryName : 'jelkya'
    };

    $scope.queryPlayer = function(){
      if($scope.formulaire.playerQueryName){
        $scope.playerResult = {};
        $http.get('/api/players/find/'+$scope.formulaire.region+'/'+$scope.formulaire.playerQueryName).success(function(data){
          $rootScope.$broadcast('findPlayer',data);
          // $scope.playerRes = data;
          //Call Stat player
          $scope.queryStatPlayer(data);
        });
      }
    };

    $scope.queryStatPlayer = function(dat){
      if(angular.isObject($scope.playerResult)){
        $http.get('/api/players/stat/'+dat.id+'/'+dat.region).success(function(data) {
          data.champions.forEach(function(elm){
            if(elm.id){
              $scope.queryChampions(elm);
            }
          });
          $scope.playerResult.stat = data;
          console.log(data);
        });
      }
    };

    $scope.queryChampions  = function(dat){
      if(angular.isObject($scope.playerResult)){
        $http.get('/api/champions/info/'+dat.id+'/'+$scope.playerResult.region).success(function(data) {
          dat.info = data;
          console.log(data);
        });
      }
    };


    $scope.setRegionForm = function(region){
      $scope.formulaire.region = region;
    };

    $scope.isUndefined = function(val) {
      return angular.isUndefined(val);
    };

    $scope.urlIcon = function(val){
      return 'http://ddragon.leagueoflegends.com/cdn/6.2.1/img/profileicon/'+val+'.png';
    };

  });
