app.controller('AccessKeyCtrl', ['$scope', '$http', 'Services', 'Translate', function ($scope, $http, Services, Translate) {
  var creatingFlag = false;
  var instanceId;
  $scope.$on('to-accessKey', function (event, data) {
    instanceId = data.selectedInstanceId;
    Services.getInstanceAccessKeyList(instanceId).then(function (response) {
      if (response.data.status == 'SUCCESS') {
        $scope.keyInfos = new Array();
        angular.forEach(response.data.data, function (keyInfo) {
          $scope.keyInfos.push(keyInfo);
        });
      }
    });
  });

  $scope.changeKeyStaus = function (val, keyInfo) {
    if (val == false) {
      Services.disableAccessKey(keyInfo.accessToken).then(function (response) {
        if (response.data.status == 'SUCCESS') {
          keyInfo.active = false;
        }
      });
    } else {
      Services.enableAccessKey(keyInfo.accessToken).then(function (response) {
        if (response.data.status == 'SUCCESS') {
          keyInfo.active = true;
        }
      });
    }
  };

  $scope.deleteKey = function (keyInfo) {
    if (!creatingFlag) {
      creatingFlag = true;
      var index = $scope.keyInfos.indexOf(keyInfo);
      Services.deleteAccessKey(keyInfo.accessToken).then(function (response) {
        if (response.data.status == 'SUCCESS') {
          $scope.keyInfos.splice(index, 1);
          creatingFlag = false;
        }
      });
    }
  };

  $scope.createNewAccessKey = function () {
    if ($scope.keyInfos.length < 5 && !creatingFlag) {
      creatingFlag = true;
      Services.createNewAccessKey(instanceId).then(function (response) {
        if (response.data.status == 'SUCCESS') {
          $scope.keyInfos.push(response.data.data);
          creatingFlag = false;
        }
      });
    } else {
      toast('error', '', Translate.T('error.ACCESSKEYLIMIT'), null);
    }
  };
}])
;