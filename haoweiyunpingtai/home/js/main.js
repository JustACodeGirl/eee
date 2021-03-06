'use strict';

angular.module('app')
  .controller('AppCtrl', ['$scope', '$translate', '$window', '$state', 'Users', 'WS', 'Services',
    function ($scope, $translate, $window, $state, Users, WS, Services) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

      $scope.app = {
        version: '1.0.0',
        settings: {
          headerFixed: true,
          asideFixed: true,
          asideFolded: false,
          asideDock: false,
          container: false
        }
      }

      $scope.app.clientWidth = $window.document.body.clientWidth;

      $scope.app.admin = {
        cacheArray: '',
        cacheDetails: '',
        cacheInfo: ''
      };

      $scope.app.userInfo = null;
      $scope.app.paidServices = null;
      $scope.app.unpaidServices = null;

      $scope.app.headerUrl = 'views/user/blocks/header.html';
      $scope.app.asideUrl = 'views/user/blocks/aside.html';

      Users.getUserInfo().success(function (response) {
        $scope.app.userInfo = response.data;
        if ($scope.app.userInfo.role == 'ADMIN') {
          $scope.app.headerUrl = 'views/admin/blocks/header_admin.html';
          $scope.app.asideUrl = 'views/admin/blocks/aside_admin.html';
          $state.go('app.admin_users');
        } else if ($scope.app.userInfo.role == 'USER') {
          $scope.app.headerUrl = 'views/user/blocks/header.html';
          $scope.app.asideUrl = 'views/user/blocks/aside.html';
          var ws = WS.connect();
          if (ws != null) {
            ws.onmessage = function (event) {
              var message = JSON.parse(event.data);
              $scope.$broadcast('newMessage', message);
              if (message.type == 'NEW_MESSAGE') {
                toast('success', '', '收到新的消息', null);
              }
            };
          }
        }
      });

      var loadServices = function () {
        Services.getPaidList().success(function (response) {
          $scope.app.paidServices = response.data;
        });

        Services.getUnpaidList().success(function (response) {
          $scope.app.unpaidServices = response.data;
        });
      }
      loadServices();

      $scope.$on('loadSerivces', function (event, params) {
        loadServices();
      });
			
      $scope.lang = {isopen: false};
      $scope.langs = {'en': 'English', 'cn-CN': '中文'};
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "中文";
      $scope.setLang = function (langKey) {
        $scope.selectLang = $scope.langs[langKey];
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
        $window.location.reload();
      };

      function isSmartDevice($window) {
        var ua = $window['navigator']['userAgent'] || $window['navigator']['js'] || $window['opera'];
        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }
    }])
  .controller('HeaderCtrl', ['$scope', '$window', 'Users', 'Messages',
    function ($scope, $window, Users, Messages) {

      $scope.logout = function () {
        Users.logout().then(function (response) {
          if (response.data.status == 'SUCCESS') {
            $window.location.href = '/index.html';
          }
        });
      }

      var loadMessageData = function () {
        Messages.getUnReadNum().then(function (num) {
          $scope.unReadNum = num;
        });

        Messages.listUnRead().then(function (response) {
          $scope.unReadMessages = response;
        });
      }

      loadMessageData();

      $scope.$on('newMessage', function (event, data) {
        loadMessageData();
      });

    }]);