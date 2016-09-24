'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
angular
  .module('yapp', [
    'ui.router',
    'ngAnimate'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/overview');
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
      })
        .state('login', {
          url: '/login',
          parent: 'base',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .state('dashboard', {
          url: '/dashboard:nickname',
          parent: 'base',
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl'
        })
          .state('overview', {
            url: '/overview',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/overview.html',
            controller: 'groupsCtrl'
          })
          .state('private-chats', {
            url: '/private-chats',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/private-chats.html',
            controller:'privateChatCtrl'
          })
          .state('group-chat', {
            url: '/group-chat:groupId',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/group-chat.html',
            controller:'groupChatCtrl'
          });

  });
