/**
 * Created by robertoarturo on 22/9/2016.
 */
angular.module('yapp')
  .service('fire',function(){
    this.config = {
      apiKey: "AIzaSyCCXmOskPVl6g2aqZT-lYa6elKIZfEHu0A",
      authDomain: "livechat-1ada2.firebaseapp.com",
      databaseURL: "https://livechat-1ada2.firebaseio.com",
      storageBucket: "livechat-1ada2.appspot.com",
      messagingSenderId: "977958073432"
    };

    this.initFire = function(){
      firebase.initializeApp(this.config);
    }
    this.initFire();

    this.fireDB = firebase.database();

  });
