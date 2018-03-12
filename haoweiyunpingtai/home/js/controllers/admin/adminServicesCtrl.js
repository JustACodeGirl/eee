app.controller('AdminServicesCtrl', ['$scope', 'Services', '$filter', function ($scope, Services, $filter) {

  Services.getServicesList().success(function (list) {
      $scope.services = list.data;
      $scope.serviceItem = $filter('orderBy')($scope.services, 'name')[0];
      $scope.serviceItem.selected = true;
  });

  $scope.filter = '';

  $scope.selectServiceItem = function (serviceItem) {
    angular.forEach($scope.services, function (serviceItem) {
      serviceItem.selected = false;
      serviceItem.editing = false;
    });
    $scope.serviceItem = serviceItem;
    $scope.serviceItem.selected = true;
  };

  $scope.createService = function () {

  };

}]);