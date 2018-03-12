'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
  ['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }
  ]
)
  .config(
  ['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider
        .otherwise('/app/user_center_main');
      $stateProvider
        .state('app', {
          abstract: true,
          url: '/app',
          templateUrl: 'views/app.html'
        })

        //admin entries
        .state('app.admin_users', {
          url: '/admin_users',
          templateUrl: 'views/admin/app_admin_users.html',
          resolve: {
            deps: ['$ocLazyLoad',
              function ($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controllers/admin/adminUsersCtrl.js']);
              }]
          }
        })
        .state('app.admin_services', {
          url: '/admin_services',
          templateUrl: 'views/admin/app_admin_services.html',
          resolve: {
            deps: ['$ocLazyLoad',
              function ($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controllers/admin/adminServicesCtrl.js']);
              }]
          }
        })
        .state('app.admin_management_tool', {
          url: '/admin_management_tool',
          templateUrl: 'views/admin/app_admin_management_tool.html',
          resolve: {
            deps: ['$ocLazyLoad',
              function ($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controllers/admin/adminToolCtrl.js']);
              }]
          }
        })
        .state('app.admin_mt_info', {
          url: '/admin_mt_info',
          templateUrl: 'views/admin/app_admin_mt_info.html',
          resolve: {
            deps: ['$ocLazyLoad',
              function ($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controllers/admin/adminToolInfoCtrl.js']);
              }]
          }
        })
        .state('app.admin_message_type', {
          url: '/admin_message_type',
          templateUrl: 'views/admin/app_admin_message_type.html',
          resolve: {
            deps: ['$ocLazyLoad',
              function ($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controllers/admin/adminMsType.js',
                                          'js/directives/windowPop.js']);
              }]
          }
        })
        .state('app.admin_message_send', {
          url: '/admin_message_send',
          templateUrl: 'views/admin/app_admin_message_send.html',
          resolve: {
            deps: ['$ocLazyLoad',
              function ($ocLazyLoad) {
                return $ocLazyLoad.load(['ui.select', 'textAngular']).then(
                  function(){
                    return $ocLazyLoad.load(['js/controllers/admin/adminMessagesCtrl.js']);
                  }
                );
              }]
          }
        })
        .state('app.admin_message_history', {
          url: '/admin_message_history',
          templateUrl: 'views/admin/app_admin_message_history.html',
          resolve: {
            deps: ['$ocLazyLoad',
              function ($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controllers/admin/adminMessagesCtrl.js']);
              }]
          }
        })

        //user entries
        .state('app.user_center_main', {
          url: '/user_center_main',
          templateUrl: 'views/user/app_user_center.html'
        })
        .state('app.service_instances', {
          url: '/service_instances/{id}',
          templateUrl: 'views/user/app_services_instances.html',
          resolve: {
            deps: ['$ocLazyLoad',
              function ($ocLazyLoad) {
                return $ocLazyLoad.load('angularBootstrapNavTree').then(
                  function () {
                    return $ocLazyLoad.load(['js/controllers/user/userAccessKeyCtrl.js',
                      'js/controllers/user/userInstanceCtrl.js']);
                  }
                );
              }
            ]
          }
        })
        .state('app.service_trial', {
          url: '/service_trial/{id}/{name}',
          templateUrl: 'views/user/app_service_trial.html',
          resolve: {
            deps: ['$ocLazyLoad',
              function ($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controllers/user/userServicesTrialCtrl.js']);
              }]
          }
        })
        .state('app.page_noinstance', {
          url: '/page_noinstance/{id}/{name}',
          templateUrl: 'views/user/app_service_noinstance.html',
          resolve: {
            deps: ['$ocLazyLoad',
              function ($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controllers/user/userServicesTrialCtrl.js']);
              }]
          }
        })
        .state('app.user_info', {
          url: '/user_info',
          templateUrl: 'views/user/app_user_info.html',
          resolve: {
            deps: ['$ocLazyLoad',
              function ($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controllers/user/userInfoCtrl.js']);
              }]
          }
        })
        .state('app.message', {
          abstract: true,
          url: '/message',
          templateUrl: 'views/user/app_message.html',
          resolve: {
            deps: ['uiLoad',
              function (uiLoad) {
                return uiLoad.load(['js/controllers/user/userMessageCtrl.js',
                  '../public/js/libs/moment.min.js']);
              }]
          }
        })
        .state('app.message.list', {
          url: '/inbox/{fold}',
          templateUrl: 'views/user/app_message_list.html'
        })
        .state('app.message.detail', {
          url: '/{messageId:[0-9]{1,4}}',
          templateUrl: 'views/user/app_message_detail.html'
        })
        .state('access', {
          url: '/access',
          template: '<div ui-view class="fade-in-right-big smooth"></div>'
        })
        .state('access.modifypasswd', {
          url: '/modifypasswd',
          templateUrl: 'views/user/page_modifypasswd.html',
          resolve: {
            deps: ['uiLoad',
              function (uiLoad) {
                return uiLoad.load(['js/controllers/user/userPasswdCtrl.js']);
              }]
          }
        })
        .state('access.modifypasswdbyemail', {
          url: '/modifypasswdbyemail',
          templateUrl: 'views/user/page_modifypasswdbyemail.html',
          resolve: {
            deps: ['uiLoad',
              function (uiLoad) {
                return uiLoad.load(['js/controllers/user/userPasswdCtrl.js']);
              }]
          }
        })
    }
  ]
);