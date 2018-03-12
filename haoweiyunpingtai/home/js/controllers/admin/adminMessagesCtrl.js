app.controller('AdminMessageSendCtrl', ['$scope', 'Messages', 'AdminUsers', 'Services', function ($scope, Messages, AdminUsers, Services) {

  var loadOptions = function () {
    AdminUsers.getUsersList().then(function (list) {
      $scope.usersList = list;
      $scope.users = {selectUsers: []};
    });

    Services.getServicesList().then(function (list) {
      $scope.servicesList = list;
      $scope.service = {selected: list[0]};
    });

    Messages.getAllMessageType().then(function (list) {
      $scope.messageTypesList = list;
      $scope.messageType = {selected: list[0]};
    });
  };

  loadOptions();

  //$scope.htmlVariable = '<h3>Try me!</h3><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style="color: blue;">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';
  $scope.htmlVariable = '';
  $scope.sendMessage = function () {
    var receivers = new Array();
    angular.forEach($scope.users.selectUsers, function (user) {
      receivers.push(user.email);
    });

    var message = {
      title: $scope.title,
      content: $scope.htmlVariable,
      multicast: $scope.recvGroup == 'all',
      catagoryId: $scope.messageType.selected.id,
      serviceTemplateId: $scope.service.selected.id
    }

    if ($scope.recvGroup == 'all') {
      Messages.sendToAll(message).then(function (resp) {
        if (resp.data.status == 'SUCCESS') {
          toast('success', '', '发送成功！', null);
          $scope.title = '';
          $scope.htmlVariable = '';
        }
      });
    } else if (receivers.length > 0) {
      Messages.sendToUsers(message, receivers).then(function (resp) {
        if (resp.data.status == 'SUCCESS') {
          toast('success', '', '发送成功！', null);
          $scope.title = '';
          $scope.htmlVariable = '';
        }
      });
    }
  };

}]);

app.controller('AdminMessageHistoryCtrl', ['$scope', 'Messages', function ($scope, Messages) {
  Messages.getAllPublic().then(function (list) {
    $scope.messagesList = list;
  });

  $scope.range = function (start, stop, step) {
    if (typeof stop == 'undefined') {
      stop = start;
      start = 0;
    }

    if (typeof step == 'undefined') {
      step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
      return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
      result.push(i);
    }

    return result;
  };

  $scope.reCallMessage = function (message) {
    Messages.reCall(message.id).then(function (resp) {
      if (resp.data.status == 'SUCCESS') {
        $scope.messagesList.splice($scope.messagesList.indexOf(message), 1);
      }
    });
  }

}]);