'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function($scope, $location,auth,fire) {
    var fireDB = fire.fireDB;

    if(auth.getNickName() !== null){
      $location.path('/dashboard'+auth.getNickName());
    }



    $scope.submit = function() {
      var userId = fireDB.ref('users').push().key
      var updates = {};
      updates[userId] = {nickName:$scope.nickName};

      var post =  fireDB.ref('users').update(updates).then(function(res){
        //console.log(res);
      });


      auth.setId(userId);
      auth.setNickName($scope.nickName);
      $location.path('/dashboard'+$scope.nickName);




    }




  });
