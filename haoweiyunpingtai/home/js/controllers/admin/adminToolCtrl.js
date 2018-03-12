app.controller('AdminToolCtrl', ['$scope', '$http', '$window', '$state', function ($scope, $http, $window, $state) {
  $scope.app.admin.cacheArray = new Array();
  var req = {
    method: 'GET',
    url: serverUrl + "/system/caches/list",
  };
  $http(req).then(function (response) {
    if (response.data.status == 'SUCCESS') {
      angular.forEach(response.data.data, function (value, key) {
        var cache_array_item = {
          key: '',
          value: '',
        };
        cache_array_item.key = key;
        cache_array_item.value = value;
        $scope.app.admin.cacheArray.push(cache_array_item);
      });
    } else if (response.data.status == 'FAILED') {
      if (response.data.errCode == '101') {
        $window.location.href = '/index.html';
      }
    } else {
      $scope.authError = '服务器出错 !';
    }
  }, function (x) {
    $scope.authError = '无法连接服务器！';
  });

  $scope.viewItem = function (cacheInfo) {
    $scope.app.admin.cacheDetails = '';
    var req = {
      method: 'GET',
      url: serverUrl + "/system/caches/detail",
      params: {name: cacheInfo.key},
    };
    $http(req).then(function (response) {
      if (response.data.status == 'SUCCESS') {
        var cacheDetails = new Array();
        angular.forEach(response.data.data, function (value, key) {
          var cache_detail_item = {
            value: value,
            key: key,
          };
          cacheDetails.push(cache_detail_item);
        });
        $scope.app.admin.cacheInfo = cacheInfo;
        $scope.app.admin.cacheDetails = cacheDetails;
        $state.go('app.admin_mt_info');
      }
    });
  };
  $scope.reloadItem = function (cacheInfo) {
    var req = {
      method: 'GET',
      url: serverUrl + "/system/caches/reload",
      params: {name: cacheInfo.key},
    };
    $http(req).then(function (response) {
      if (response.data.status == 'SUCCESS') {
      }
    });
  };
}]);