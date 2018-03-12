app.controller('adminMsType', ['$scope', '$http', '$filter', '$window', '$state', function($scope, $http, $filter, $window, $state) {
  $scope.item = new Array();
  var listAll = function(){
    var req = {
      method: 'GET',
      url: serverUrl+"/messageCatagories/admin/listAll",
    };
    $http(req).then(function(response) {
      if (response.data.status == 'SUCCESS') {
        console.log(response.data.data);
        $scope.items = response.data.data;
        angular.forEach(response.data.data, function(value,key){
          var admin_message_type = {
            key: '',
            value: '',
          }
          admin_message_type.key = key;
          admin_message_type.value = value;
          $scope.item.push(admin_message_type);
        });
        console.log($scope.item);
      }
    });
  }

  listAll();

  $scope.editMessageType = function(){
    var item = {};
    item.id=jQuery("#catagoryId").val();
    item.name=jQuery("#catagoryName").val();
    item.desc=jQuery("#catagoryDesc").val();
    console.log(item);
    console.log(item.name);
    console.log(item.desc);
    console.log(item.id);
    var req = {
      method: 'POST',
      url: serverUrl+"/messageCatagories/admin/"+item.id+"/update",
      params : {
        name: item.name,
        desc: item.desc,
      }
    };
    $http(req).then(function(response) {
      if (response.data.status == 'SUCCESS') {
        console.log(response.data);
        item.name = $scope.name;
        item.desc = $scope.desc;
        listAll();
        editMessage=false;
      }
    });
  };

  $scope.saveMessageType = function(){
    var messageCatagory = new Object();
    //$scope.name ="";
    //$scope.desc ="";
    messageCatagory.name = $scope.name;
    messageCatagory.desc = $scope.desc;

    var req = {
      method: 'POST',
      url: serverUrl+"/messageCatagories/admin/create",
      data: messageCatagory,
    };
    $http(req).then(function(response) {
      if (response.data.status == 'SUCCESS') {
        console.log(response);
        var item = response.data;
        console.log(item);
        listAll();
      }
    });
  };

  $scope.removeItem = function(item) {
    console.log(item);
      var req = {
        method: 'post',
        url: serverUrl + "/messageCatagories/admin/"+item.id+"/delete",
      };
      var http = $http(req);
      http.then(function (response) {
        if (response.data.status == 'SUCCESS') {
          console.log(item);
          $scope.item = item;
          var index = $scope.items.indexOf(item);
          console.log(index);
          if (index != -1) {
            $scope.items.splice(index, 1);
          }
          //console.log($scope.item);
          alert('确定删除？');
        }
      });
    }

  $scope.showUpdateDialog = function(item)
  {
    console.log(item.name + "    " + item.desc+ "    " + item.id);

    jQuery("#catagoryId").val(item.id);
    jQuery("#catagoryName").val(item.name);
    jQuery("#catagoryDesc").val(item.desc);
  }

$scope.createMessagetype = function(item){
  console.log(item.name + "    " + item.desc+ "    " + item.id);
 $scope.name = "";
 $scope.desc = "";
}
}]);