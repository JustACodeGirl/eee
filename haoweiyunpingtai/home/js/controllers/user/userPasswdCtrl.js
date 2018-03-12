'use strict';

app.controller('ModifyPasswdController', ['$scope', 'Users', 'Translate', function ($scope, Users, Translate) {
  $scope.stepShow = [true, false];

  $scope.changePassword = function (invalid) {
    if (!invalid) {
      Users.changePassword($scope.oldPassword, $scope.newPassword).then(function (response) {
        if (response.data.status == 'SUCCESS') {
          $scope.stepShow = [false, true];
        } else if (response.data.status == 'FAILED') {
          if (response.data.errCode == '203') {
            toast('error', '', Translate.T('error.OLDPASSWORDERROR'), null);
          } else if (response.data.errCode == '201') {
            toast('error', '', Translate.T('error.NEWPASSWORDFORMAT'), null);
          }
        }
      });
    } else {
      toast('error', '', Translate.T('error.NOPASSWORD'), null);
    }
  };
}])
;

app.controller('ModifyPasswdByEmailController', ['$scope', 'Users', '$location', function ($scope, Users, $location) {
  $scope.stepShow = [true, false];

  var token = $location.search()['token'];
  $scope.changePasswordViaFinding = function () {
    Users.changePasswordViaFinding(token, $scope.newPassword).then(function (response) {
      if (response.data.status == 'SUCCESS') {
        $scope.passwdStep.stepShow = [false, true];
      }
    });
  };
}])
;