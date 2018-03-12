/**
 * Created by leo.liu on 2015/9/9.
 */
app.factory('Users', ['$http', function ($http) {
    return {
        getUserInfo: function () {
            return $http({
                method: 'GET',
                url: serverUrl + "/users/current"
            });
        },
        updateUserInfo: function (userinfo) {
            return $http({
                method: 'POST',
                url: serverUrl + "/users/update",
                params: userinfo
            });
        },
        checkNickName: function (nickName) {
            return $http({
                method: 'GET',
                url: serverUrl + "/users/checkNickName",
                params: {nickName: nickName}
            });
        },
        checkPhone: function (phone) {
            return $http({
                method: 'GET',
                url: serverUrl + "/users/checkPhone",
                params: {phone: phone}
            });
        },
        changePassword: function (oldPassword, newPassword) {
            return $http({
                method: 'POST',
                url: serverUrl + "/users/changePassword",
                params: {oldPassword: oldPassword, newPassword: newPassword}
            });
        },
        changePasswordViaFinding: function (token, newPassword) {
            return $http({
                method: 'POST',
                url: serverUrl + "/users/changePasswordViaFinding",
                params: {token: token, newPassword: newPassword}
            });
        },
        logout: function () {
            return $http({
                method: 'POST',
                url: serverUrl + "/users/logout"
            });
        }
    };
}]);

app.factory('Services', ['$http', function ($http) {
    return {
        getServicesList: function () {
            return $http({
                method: 'GET',
                url: serverUrl + "/services/template/list"
            });
        },
        getPaidList: function () {
            return $http({
                method: 'GET',
                url: serverUrl + "/services/template/getPaidList"
            });
        },
        getUnpaidList: function () {
            return $http({
                method: 'GET',
                url: serverUrl + "/services/template/getUnpaidList"
            });
        },
        serviceTrial: function (serviceId, trialInfo) {
            return $http({
                method: 'POST',
                url: serverUrl + "/services/template/" + serviceId + "/try",
                params: {instanceName: trialInfo.instanceName, appId: trialInfo.appId}
            });
        },
        getInstanceList: function (serviceId) {
            return $http({
                method: 'GET',
                url: serverUrl + "/services/template/" + serviceId + "/instance/list"
            });
        },
        enableInstance: function (instanceId) {
            return $http({
                method: 'POST',
                url: serverUrl + "/services/instance/" + instanceId + "/enable"
            });
        },
        disableInstance: function (instanceId) {
            return $http({
                method: 'POST',
                url: serverUrl + "/services/instance/" + instanceId + "/disable"
            });
        },
        getInstanceAccessKeyList: function (instanceId) {
            return $http({
                method: 'GET',
                url: serverUrl + "/services/instance/" + instanceId + "/key/list"
            });
        },
        createNewAccessKey: function (instanceId) {
            return $http({
                method: 'POST',
                url: serverUrl + "/services/instance/" + instanceId + "/key/add"
            });
        },
        enableAccessKey: function (accessToken) {
            return $http({
                method: 'POST',
                url: serverUrl + "/services/instance/key/" + accessToken + "/enable"
            });
        },
        disableAccessKey: function (accessToken) {
            return $http({
                method: 'POST',
                url: serverUrl + "/services/instance/key/" + accessToken + "/disable"
            });
        },
        deleteAccessKey: function (accessToken) {
            return $http({
                method: 'POST',
                url: serverUrl + "/services/instance/key/" + accessToken + "/delete"
            });
        },
    };
}]);