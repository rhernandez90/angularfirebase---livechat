/**
 * Created by robertoarturo on 22/9/2016.
 */
angular.module('yapp')
  .service('auth',function(){
      this.id = 0;
      this.nickName = "";

      this.setId = function(id){
        localStorage.setItem("id", id);
      }

      this.setNickName = function(nickName){
        localStorage.setItem("nickName", nickName);
      }


      this.getId = function(){
        return localStorage.getItem("id");
      }

      this.getNickName = function () {
        return localStorage.getItem("nickName");
      }


      this.logout = function () {
        localStorage.removeItem("id")
        localStorage.removeItem("nickName")
      }

  });
