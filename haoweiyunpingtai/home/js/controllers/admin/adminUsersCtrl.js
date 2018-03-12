app.controller('AdminUsersCtrl', ['$scope', 'AdminUsers', 'Services', '$filter', function ($scope, AdminUsers, Services, $filter) {
  AdminUsers.getUsersList().then(function (list) {
    $scope.usersList = list;
    $scope.userItem = $filter('orderBy')($scope.usersList, 'email')[0];
    $scope.userItem.selected = true;
    $scope.selectItem($scope.userItem);
  });

  $scope.filter = '';
  $scope.createAdmin = false;

  $scope.selectItem = function (userItem) {
    $scope.createAdmin = false;
    angular.forEach($scope.usersList, function (item) {
      item.selected = false;
      item.editing = false;
    });
    $scope.userItem = userItem;
    $scope.userItem.selected = true;
    $scope.userInstancesInfo = new Array();

    if ($scope.userItem.role == 'USER') {
      AdminUsers.getUserInstancesList($scope.userItem.id).then(function (list) {
        var instancesInfo = list;
        angular.forEach(instancesInfo, function (instancesData) {
          angular.forEach(instancesData, function (instanceData) {
            $scope.userInstancesInfo.push(instanceData);
          });
        });
      });
    }
  };

  $scope.changeInstanceStausByAdmin = function (instanceState, instanceInfo) {
    if (instanceState == true) {
      Services.enableInstance(instanceInfo.id).then(function (response) {
        if (response.data.status == 'SUCCESS') {
          instanceInfo.activeState = 'ACTIVE';
        }
      });
    } else {
      Services.disableInstance(instanceInfo.id).then(function (response) {
        if (response.data.status == 'SUCCESS') {
          instanceInfo.activeState = 'INACTIVE';
        }
      });
    }
  };

  $scope.changeUserState = function (userItem) {
    if (userItem.activeState == 'ACTIVE') {
      AdminUsers.disableUser(userItem.id).then(function (response) {
        if (response.data.status == 'SUCCESS') {
          userItem.activeState = 'INACTIVE';
        }
      });
    } else if (userItem.activeState == 'INACTIVE') {
      AdminUsers.enableUser(userItem.id).then(function (response) {
        if (response.data.status == 'SUCCESS') {
          userItem.activeState = 'ACTIVE';
        }
      });
    }
  };

  $scope.createAdminUser = function () {
    AdminUsers.createAdminUser($scope.email, $scope.password).then(function (response) {
      if (response.data.status == 'SUCCESS') {
        var item = response.data.data;
        $scope.usersList.push(item);
        $scope.selectItem(item);
        $scope.createAdmin = false;
      }
    });
    //if success
    /*$scope.usersList.push(item);
     $scope.selectItem(item);
     $scope.item.editing = true;*/
    //else
  };

  $scope.editItem = function (item) {
    if (item && item.selected) {
      item.editing = true;
    }
  };

  $scope.doneEditing = function (item) {
    item.editing = false;
  };

  $scope.checkPasswdFormat = function (value) {
    if (value == 0) {
      if ($scope.repeatPassword != null) {
        $scope.form.repeatPassword.$error.dontmatch = ($scope.password != $scope.repeatPassword);
      }
    } else {
      $scope.form.repeatPassword.$error.dontmatch = ($scope.password != $scope.repeatPassword);
    }
  };
}]);