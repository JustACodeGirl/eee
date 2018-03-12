/**
 * Created by leo.liu on 2015/9/11.
 */
angular.module('app').factory('responseRejector', ['$q', '$window', function ($q, $window) {
  var responseRejector = {
    'request': function (request) {
      return request;
    },

    'requestError': function (rejection) {
      return $q.reject(rejection);
    },

    'response': function (response) {
      if (response.data.errCode == '101') {
        $window.location.href = '../index/views/signin.html';
        return $q.reject(response);
      }
      return response;
    },

    'responseError': function (rejection) {
      return $q.reject(rejection);
    },
  };

  return responseRejector;
}]);