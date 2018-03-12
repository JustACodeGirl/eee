app.controller('ServicesDetailController', ['$scope', '$window', '$stateParams', function ($scope, $window, $stateParams) {
  if ($stateParams.id > 0) {
    $scope.selectedUnpaidServiceId = $stateParams.id;
    $scope.selectedUnpaidServiceName = $stateParams.name;
  } else {
    $window.location.href = 'index.html';
  }
}])
;

app.controller('ServiceTrialController', ['$scope', '$state', 'Services', '$window', '$stateParams', 'Translate',
  function ($scope, $state, Services, $window, $stateParams, Translate) {
    if ($stateParams.id > 0) {
      $scope.selectedUnpaidServiceId = $stateParams.id;
      $scope.selectedUnpaidServiceName = $stateParams.name;
    } else {
      $window.location.href = 'index.html';
    }

    $scope.sendTrialInfo = function () {
      Services.serviceTrial($scope.selectedUnpaidServiceId, $scope.trialInfo).then(function (response) {
        if (response.data.status == 'SUCCESS') {
          $scope.$emit("loadServices", "refresh");
          $state.go('app.user_center_main');
          toast('success', '', Translate.T('success.TRIAL'), null);
        } else if (response.data.status == 'FAILED') {
          if (response.data.errCode == '303') {
            toast('error', '', Translate.T('error.TRIALFAILED'), null);
          }
        }
      });
    }
  }])
;