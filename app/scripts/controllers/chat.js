/**
 * Created by robertoarturo on 22/9/2016.
 */
angular.module('yapp')
  .controller('groupChatCtrl',function ($scope, $location,$timeout,auth,fire,$stateParams,$anchorScroll) {
    var fireDB = fire.fireDB;
    var groupId = $stateParams.groupId;
    $scope.userId = auth.getId();


    fireDB.ref('groups/'+groupId+"/chats").on('value',function (snapshot) {
      $scope.messagesList = snapshot.val();
      $scope.$apply();


      $timeout(function(){
        $location.hash('bottom');
        $anchorScroll();
      },1000);

    });





    $scope.newMessage = function (keyEvent) {
      if (keyEvent.which === 13){

        var jmessage = {
          userId   : auth.getId(),
          nickName : auth.getNickName(),
          message  : $scope.message,
          dateTime : new Date()
        };

        fireDB.ref('groups/'+groupId+"/chats").push().set(jmessage);
        $scope.message = "";

        $location.hash('bottom');
        $anchorScroll();
      }


    };









    //console.log("parametros del grupo")
    //console.log($stateParams.groupId);
  })
  .controller('privateChatCtrl',function ($scope, $location,$timeout,auth,fire,$stateParams,$anchorScroll) {

    var fireDB = fire.fireDB;
    $scope.userId = auth.getId();
    $scope.users = {};
    $scope.targetChat  = undefined;

    fireDB.ref('users').on('value',function (snapshot) {
      $scope.users = snapshot.val();
      $scope.$apply();
      downScroll();

    });

    function downScroll() {
      $timeout(function(){
        $location.hash('bottom');
        $anchorScroll();
      },1000);
    }

    $scope.target = function(targetUserId,target){
      $scope.targetUserId = targetUserId;
      $scope.targetNick   = target.nickName;
      $scope.messagesList = {};

      if(target.privateChat !== undefined){

        if (target.privateChat[auth.getId()] !== undefined){
          $scope.messagesList = target.privateChat[auth.getId()].chats;
          downScroll();
          target.privateChat[auth.getId()].new = 0;
          $scope.targetChat = true;
          return false;
        }else {
          $scope.targetChat = undefined;
        }
      } else{

        $scope.targetChat = undefined;
      }

      $scope.users[auth.getId()].privateChat[targetUserId].new = 0;
      $scope.messagesList = $scope.users[auth.getId()].privateChat[targetUserId].chats;
      downScroll();
    }


    $scope.isNewMessage = function(targetUserId,target) {
      if (target.privateChat != undefined) {
        if (target.privateChat[auth.getId()] != undefined) {

          if (target.privateChat[auth.getId()].new == 1)
            return 'panel-warning';
          return '';

        }
      }

      if ($scope.users[auth.getId()].privateChat != undefined) {
        if ($scope.users[auth.getId()].privateChat[targetUserId] != undefined) {

          if ($scope.users[auth.getId()].privateChat[targetUserId].new == 1)
            return 'panel-warning';
          return '';

        }
      }


    };




    $scope.newMessage = function (keyEvent) {
      if (keyEvent.which === 13) {

        var jmessage = {
          userId: auth.getId(),
          nickName: auth.getNickName(),
          message: $scope.message
        };
        $scope.message = '';
        if($scope.targetChat !== undefined){
          var key  = fireDB.ref('users/'+$scope.targetUserId+'/privateChat/'+auth.getId()+'/chats').push().key
          var update = {};
          update[key] = jmessage;
          var post =  fireDB.ref('users/'+$scope.targetUserId+'/privateChat/'+auth.getId()).update({new:1}).then(function(res){});
          var post =  fireDB.ref('users/'+$scope.targetUserId+'/privateChat/'+auth.getId()+'/chats').update(update).then(function(res){});
          $scope.messagesList[key] = jmessage;

        }else{

          var key = fireDB.ref('users/'+auth.getId()+'/privateChat/'+$scope.targetUserId+'/chats').push().key;
          var update = {};
          update[key] = jmessage;

          fireDB.ref('users/'+auth.getId()+'/privateChat/'+$scope.targetUserId).update({new:1}).then(function(res){});
          var post =  fireDB.ref('users/'+auth.getId()+'/privateChat/'+$scope.targetUserId+'/chats').update(update).then(function(res){});
          $scope.messagesList[key] = jmessage;
        }

      }
    }
  });
