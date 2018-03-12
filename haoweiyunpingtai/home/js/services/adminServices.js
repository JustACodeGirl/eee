/**
 * Created by leo.liu on 2015/9/9.
 */
app.factory('AdminUsers', ['$http', function ($http) {
  var factory = {};

  factory.getUsersList = function () {
    var req = {
      method: 'GET',
      url: serverUrl + "/users/admin/list",
      params: {limit: 100}
    };
    var getUsersList = $http(req).then(function (resp) {
      return resp.data.data;
    });
    return getUsersList;
  };

  factory.getUserInstancesList = function (id) {
    var req = {
      method: 'GET',
      url: serverUrl + "/users/" + id + "/instance/list"
    };
    var getUserInstancesList = $http(req).then(function (resp) {
      return resp.data.data;
    });
    return getUserInstancesList;
  };

  factory.enableUser = function (id) {
    var req = {
      method: 'POST',
      url: serverUrl + "/users/admin/enable",
      params: {userIds: id}
    };
    var enableUser = $http(req).then(function (resp) {
      return resp;
    });
    return enableUser;
  };

  factory.disableUser = function (id) {
    var req = {
      method: 'POST',
      url: serverUrl + "/users/admin/disable",
      params: {userIds: id}
    };
    var disableUser = $http(req).then(function (resp) {
      return resp;
    });
    return disableUser;
  };

  factory.createAdminUser = function (email, password) {
    var req = {
      method: 'POST',
      url: serverUrl + "/users/admin/create",
      params: {email: email, password: password}
    };
    var createAdminUser = $http(req).then(function (resp) {
      return resp;
    });
    return createAdminUser;
  };

  return factory;
}]);