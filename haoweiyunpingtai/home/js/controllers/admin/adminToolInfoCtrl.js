app.controller('AdminToolinfoCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.removeItem = function (cacheName, cacheDetail) {
    if (cacheName == 'USER_SERVICE_INSTANCES' || cacheName == 'SERVICE_ACCESS_KEY' || cacheName == 'USERS' || cacheName == 'SERVICE_INSTANCES' || cacheName == 'ACCESS_TOKENS') {
      var req = {
        method: 'GET',
        url: serverUrl + "/system/caches/remove",
        params: {
          cacheName: cacheName,
          key: cacheDetail.key
        },
      };

      var http = $http(req);
      http.then(function (response) {
        if (response.data.status == 'SUCCESS') {
          var index = $scope.app.admin.cacheDetails.indexOf(cacheDetail);
          if (index != -1) {
            $scope.app.admin.cacheDetails.splice(index, 1);
          }
          toast('success', '', '删除成功', null);
        }
      });
    }
    else if (cacheName == 'EMAILS' || cacheName == 'NICK_NAMES' || cacheName == 'PHONES') {
      console.log(cacheName);
      console.log(cacheDetail.value);
      var req = {
        method: 'GET',
        url: serverUrl + "/system/caches/remove",
        params: {
          cacheName: cacheName,
          key: cacheDetail.value
        },
      };
      var http = $http(req);
      http.then(function (response) {
        if (response.data.status == 'SUCCESS') {
          var index = $scope.app.admin.cacheDetails.indexOf(cacheDetail);
          if (index != -1) {
            $scope.app.admin.cacheDetails.splice(index, 1);
          }
          toast('success', '', '删除成功', null);
        }
      });
    }
  }
}]);
