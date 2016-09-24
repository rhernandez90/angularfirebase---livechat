/**
 * Created by robertoarturo on 22/9/2016.
 */
'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('groupsCtrl', function($scope, $location,auth,fire) {

    var fireDB = fire.fireDB;
    $scope.groups = {};

    fireDB.ref('groups/').on('value', function(data) {
      $scope.groups = data.val();
      $scope.$apply();

    });





    $scope.newGroup = function() {
      console.log('entro a grupo');
      fireDB.ref('groups').push().set({groupName:$scope.groupName});
      return false;
    }

  });
