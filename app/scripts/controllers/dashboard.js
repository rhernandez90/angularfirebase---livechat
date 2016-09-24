'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function($scope,$location, $state,auth) {

    $scope.$state = $state;
    console.log($scope.$state);
    //$scope.nickName =  auth.nickName
    $scope.nickName =  auth.getNickName();


    $scope.logout = function(){
      auth.logout();
      $location.path('/');
    }
  });
