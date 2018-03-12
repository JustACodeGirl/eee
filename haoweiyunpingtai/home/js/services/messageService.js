app.factory('Messages', ['$http', function ($http) {
  var factory = {};

  factory.getAllMessages = function () {
      var req = {
        method: 'GET',
        url: serverUrl + "/messages/listAll"
      };
      var getAllMessages = $http(req).then(function (resp) {
        return resp.data.data;
      });
      return getAllMessages;
  };

  factory.getMessageById = function (id) {
    var req = {
      method: 'GET',
      url: serverUrl + "/messages/"+id+"/detail"
    };
    var getMessageById = $http(req).then(function (resp) {
      return resp.data.data;
    });
    return getMessageById;
  };

  factory.getUnReadNum = function () {
    var req = {
      method: 'GET',
      url: serverUrl + "/messages/getUnReadNum"
    };
    var getUnReadNum = $http(req).then(function (resp) {
      return resp.data.data;
    });
    return getUnReadNum;
  };

  factory.listUnRead = function () {
    var req = {
      method: 'GET',
      url: serverUrl + "/messages/listUnRead"
    };
    var listUnRead = $http(req).then(function (resp) {
      return resp.data.data;
    });
    return listUnRead;
  };

  factory.markAsRead = function (ids) {
    console.log(ids.toString());
    var req = {
      method: 'POST',
      url: serverUrl + "/messages/markAsRead",
      params: {ids : ids}
    };
    var markAsRead = $http(req).then(function (resp) {
      return resp;
    });
    return markAsRead;
  };

  factory.messageDelete = function (ids) {
    var req = {
      method: 'POST',
      url: serverUrl + "/messages/delete",
      params: {ids : ids}
    };
    var messageDelete = $http(req).then(function (resp) {
      return resp;
    });
    return messageDelete;
  };

  factory.sendToAll = function (message) {
    var req = {
      method: 'POST',
      url: serverUrl + "/messages/admin/sendToAll",
      data: message
    };
    var sendToAll = $http(req).then(function (resp) {
      return resp;
    });
    return sendToAll;
  };

  factory.sendToUsers = function (message, ids) {
    var req = {
      method: 'POST',
      url: serverUrl + "/messages/admin/send",
      data: message,
      params: {userIds : ids}
    };
    var sendToUsers = $http(req).then(function (resp) {
      return resp;
    });
    return sendToUsers;
  };

  factory.getAllPublic = function () {
    var req = {
      method: 'GET',
      url: serverUrl + "/messages/admin/listPublic"
    };
    var getAllPublic = $http(req).then(function (resp) {
      return resp.data.data;
    });
    return getAllPublic;
  };

  factory.reCall = function (id) {
    var req = {
      method: 'POST',
      url: serverUrl + "/messages/admin/"+id+"/recall"
    };
    var reCall = $http(req).then(function (resp) {
      return resp;
    });
    return reCall;
  };

  factory.getAllMessageType = function (id) {
    var req = {
      method: 'GET',
      url: serverUrl + "/messageCatagories/admin/listAll"
    };
    var getAllMessageType = $http(req).then(function (resp) {
      return resp.data.data;
    });
    return getAllMessageType;
  };

  return factory;
}]);