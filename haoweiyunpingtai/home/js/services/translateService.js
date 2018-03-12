/**
 * Created by leo.liu on 2015/9/11.
 */

//used in js file
app.factory("Translate", ['$translate', function ($translate) {
  var Translate = {
    T: function (key) {
      if (key) {
        return $translate.instant(key);
      }
      return key;
    }
  }

  return Translate;
}]);