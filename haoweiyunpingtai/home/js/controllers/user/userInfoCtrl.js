'use strict';

app.controller('UserInfoCtrl', ['$scope', 'Users', 'Translate', function ($scope, Users, Translate) {
    $scope.userInfo = $scope.app.userInfo;
    if ($scope.userInfo.email != null) {
      $scope.isCompany = $scope.userInfo.company ? 1 : 0;
    }

  $scope.isNickNameInputOver = 0;
  $scope.$watch('isNickNameInputOver', function () {
    if (($scope.isNickNameInputOver == 1) && $scope.userInfo.nickName) {
      Users.checkNickName($scope.userInfo.nickName).then(function (response) {
        if (response.data.status == 'SUCCESS') {
          $scope.isNickNameCheckProp = true;
          $scope.nickNameCheckStr = Translate.T('success.CHECKNICKNAME');
        } else if (response.data.status == 'FAILED') {
          $scope.isNickNameCheckProp = false;
          if (response.data.errCode == '201') {
            $scope.nickNameCheckStr = Translate.T('error.NICKNAMEFORMAT');
          } else if (response.data.errCode == '205') {
            $scope.nickNameCheckStr = Translate.T('error.NICKNAMEBEENUSED');
          }
        }
      });
    }
  }, true);

  $scope.isPhoneInputOver = 0;
  $scope.$watch('isPhoneInputOver', function () {
    if (($scope.isPhoneInputOver == 1)) {
      if ($scope.userInfo.phone) {
        Users.checkPhone($scope.userInfo.phone).then(function (response) {
          if (response.data.status == 'SUCCESS') {
            $scope.isPhoneCheckProp = true;
            $scope.phoneCheckStr = Translate.T('success.CHECKPHONE');
          } else if (response.data.status == 'FAILED') {
            $scope.isPhoneCheckProp = false;
            if (response.data.errCode == '201') {
              $scope.phoneCheckStr = Translate.T('error.PHONEERROR');
            } else if (response.data.errCode == '206') {
              $scope.phoneCheckStr = Translate.T('error.PHONEBEENUSED');
            }
          }
        });
      } else {
        $scope.isPhoneCheckProp = false;
        $scope.phoneCheckStr = Translate.T('error.PHONEHINT');
      }
    }
  }, true);

  $scope.onRadioClick = function (val) {
    $scope.isCompany = val;
  };

  $scope.saveUserInfo = function (invalidData) {
    $scope.userInfo.company = $scope.isCompany ? true : false;
    var isInvalid = $scope.isCompany ? invalidData[0] : invalidData[1];
    if (!isInvalid) {
      Users.updateUserInfo($scope.userInfo).then(function (response) {
        if (response.data.status == 'SUCCESS') {
          toast('success', '', Translate.T('success.SAVE'), null);
        } else if (response.data.status == 'FAILED') {
          if (response.data.errCode == '201') {
            toast('error', '', Translate.T('error.INFOFORMAT'), null);
          }
        }
      });
    } else {
      toast('error', '', Translate.T('error.INFOINPUT'), null);
    }
  };
}])
;