app.controller('MessageCtrl', ['$scope', function ($scope) {
  $scope.folds = [
    {name: '全部消息', filter: ''},
    {name: '未读消息', filter: 'unread'},
    {name: '已读消息', filter: 'alread'}
  ];

  $scope.types = ["产品发布", "打折促销", "安全消息", "故障消息"];

  $scope.foldClass = function (fold) {
    return {
      'fa-circle text-info-lter': angular.lowercase(fold) === 'unread'
    };
  };

  $scope.$on('unReadNum', function (event, num) {
    $scope.unReadNum = num;
  });
}]);

app.controller('MessageListCtrl', ['$scope', 'Messages', '$stateParams', '$filter', function ($scope, Messages, $stateParams, $filter) {
  $scope.page = 1;
  $scope.totalPages = 1;
  $scope.havaSelected = false;
  $scope.fold = $stateParams.fold;

  angular.forEach($scope.folds, function (item) {
    if (item.filter === $scope.fold) {
      $scope.title = item.name;
    }
  });

  var loadMessageData = function () {
    Messages.getUnReadNum().then(function (unReadNum) {
      $scope.$emit('unReadNum', unReadNum);
    });

    Messages.getAllMessages().then(function (messages) {
      $scope.messages = messages;
      angular.forEach($scope.messages, function (message) {
        message.selected = false;
        message.fold = message.read ? 'alread' : 'unread';
      });
    });
  };

  loadMessageData();

  $scope.$on('newMessage', function (event, data) {
    loadMessageData();
  });

  $scope.changeSelection = function () {
    var allState = false;
    angular.forEach($scope.messages, function (message) {
      allState |= message.selected;
    });
    $scope.havaSelected = allState;
  };

  $scope.changeSelectionAll = function (messages) {
    angular.forEach(messages.data, function (message) {
      message.selected = $scope.selectAll;
    });
    $scope.havaSelected = $scope.selectAll;
  };

  $scope.prePage = function () {
    if ($scope.page > 1) {
      $scope.page--;
    }
  };

  $scope.nextPage = function () {
    if ($scope.page < $scope.totalPages) {
      $scope.page++;

      mails.getNextPage.then(function () {

      });
    }
  };

  $scope.delMessage = function () {
    var messages = angular.extend({}, $scope.messages);
    var ids = new Array();
    angular.forEach(messages, function (message) {
      if (message.selected) {
        var index = $scope.messages.indexOf(message);
        if (index != -1) {
          ids.push(message.id);
        }
      }
    });

    Messages.messageDelete(ids).then(function (resp) {
      if (resp.data.status == 'SUCCESS') {
        angular.forEach(messages, function (message) {
          if (message.selected) {
            var index = $scope.messages.indexOf(message);
            if (index != -1) {
              $scope.messages.splice(index, 1);
            }
          }
        });
        $scope.havaSelected = false;
        $scope.selectAll = false;
      }
    });
  };

  $scope.markRead = function () {
    var messages = angular.extend({}, $scope.messages);
    var ids = new Array();
    var indexs = new Array();
    angular.forEach(messages, function (message) {
      if (message.selected) {
        var index = $scope.messages.indexOf(message);
        if (index != -1) {
          ids.push(message.id);
          indexs.push(index);
        }
      }
    });

    Messages.markAsRead(ids).then(function (resp) {
      if (resp.data.status == 'SUCCESS') {
        angular.forEach(indexs, function (index) {
          $scope.messages[index].fold = 'alread';
          $scope.messages[index].selected = false;
        });
        $scope.havaSelected = false;
        $scope.selectAll = false;
      }
    });
  };

}]);

app.controller('MessageDetailCtrl', ['$scope', 'Messages', '$state', '$stateParams', function ($scope, Messages, $state, $stateParams) {
  Messages.getMessageById($stateParams.messageId).then(function (message) {
    $scope.message = message;
  });

  $scope.$on('newMessage', function (event, data) {
    Messages.getUnReadNum().then(function (unReadNum) {
      $scope.$emit('unReadNum', unReadNum);
    });
  });

  $scope.deleteMessage = function (id) {
    Messages.messageDelete(id).then(function (resp) {
      if (resp.data.status == 'SUCCESS') {
        $state.go('app.message.list');
      }
    });
  };
}]);