app.controller('AbnTestController', ['$scope', '$window', '$state', '$stateParams', 'Services', 'Translate',
  function ($scope, $window, $state, $stateParams, Services, Translate) {
  var tree = {};
  var treeData = new Array();

  $scope.instanceStats = [];
  $scope.serviceIndex = 0;
  $scope.instanceIndex = 0;

  //从$stateParams中获取所选服务的Id
  if ($stateParams.id > 0) {
    $scope.selectedPaidServiceId = $stateParams.id;
  } else {
    $window.location.href = 'index.html';
  }

  function initInstanceCtrl() {
    var index = 0;
    var selectedIndex = -1;
    angular.forEach($scope.paidServices, function (serviceData) {
      var treeDataItem = {
        label: Translate.T(serviceData.name),
        id: index,
        serviceId: serviceData.id,
        children: []
      };
      
      treeData.push(treeDataItem);
      if ($scope.selectedPaidServiceId == treeDataItem.serviceId) {
        selectedIndex = index;
      }
      index++;
    });

    getInstanceInfo(selectedIndex, function () {
      $scope.my_tree.select_by_treeid($scope.selectedPaidServiceId + '-0');
    });
  }

  function getInstanceInfo(index, calbFunc) {
    if (index < 0) {
      $window.location.href = 'index.html';
    }
    Services.getInstanceList(treeData[index].serviceId).then(function (response) {
      if (response.data.status == 'SUCCESS') {
        var instancesData = response.data.data;
        var instancesInfoTemp = new Array();
        var i = 0;
        treeData[index].children = [];
        angular.forEach(instancesData, function (instanceData) {
          instancesInfoTemp.push(instanceData);
          var treeDataItemChildren = {
            label: instanceData.name,
            id: i,
            parentId: index,
            treeId: $scope.paidServices[index].id + "-" + i,
            data: {
              chartData: '[ [0,7],[1,6.5],[2,12.5],[3,7],[4,9],[5,6],[6,11],[7,6.5],[8,8],[9,7] ]'
            }
          };
          treeData[index].children.push(treeDataItemChildren);
          i++;
        });

        $scope.instancesInfo = instancesInfoTemp;
        calbFunc();
      }
    });
  }

  $scope.my_tree_handler = function (branch) {
    var _ref;
    if ((_ref = branch.data) != null ? _ref : void 0) {

      $scope.selectedUnpaidServiceId = treeData[branch.parentId].serviceId;
      $scope.selectedUnpaidServiceName = $scope.my_tree.get_parent_branch(branch).label;

      $scope.instanceName = branch.label;
      $scope.instanceIndex = branch.id;
      $scope.serviceIndex = branch.parentId;
      $scope.instanceStats = branch.data.chartData;

      var params = {
        selectedInstanceId: $scope.instancesInfo[$scope.instanceIndex].id
      }
      //通知子控制器AccessKeyCtrl所选实例Id
      $scope.$broadcast('to-accessKey', params);

    } else if ((_ref = branch.serviceId) != null ? _ref : void 0) {
      if (branch.children.length == 0) {
        $state.go('app.service_instances', {id: branch.serviceId});
      }
    }
  };

  $scope.changeInstanceState = function (instanceState) {
    if (instanceState == true) {
      Services.enableInstance($scope.instancesInfo[$scope.instanceIndex].id).then(function (response) {
        if (response.data.status == 'SUCCESS') {
          $scope.instancesInfo[$scope.instanceIndex].activeState = 'ACTIVE';
        }
      });
    } else {
      Services.disableInstance($scope.instancesInfo[$scope.instanceIndex].id).then(function (response) {
        if (response.data.status == 'SUCCESS') {
          $scope.instancesInfo[$scope.instanceIndex].activeState = 'INACTIVE';
        }
      });
    }
  };

  Services.getPaidList().success(function (response) {
    $scope.paidServices = response.data;
    initInstanceCtrl();
  });

  $scope.my_data = treeData;
  $scope.my_tree = tree;
}]);