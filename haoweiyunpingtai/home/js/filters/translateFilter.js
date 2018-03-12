/**
 * Created by leo.liu on 2015/9/11.
 */

//used in html file
app.filter("T", ['$translate', function ($translate) {
  return function (key) {
    if(key){
      return $translate.instant(key);
    }
  }
}]);