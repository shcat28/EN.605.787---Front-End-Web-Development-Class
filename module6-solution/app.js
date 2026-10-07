(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {

  $scope.lunchItems = "";
  $scope.message = "";
  $scope.messageClass = "";
  $scope.inputClass = "";

  $scope.checkLunch = function () {

    // Check whether the user entered any data.
    if (!$scope.lunchItems) {
      $scope.message = "Please enter data first";
      $scope.messageClass = "error";
      $scope.inputClass = "error-border";
      return;
    }

    // Split the entered lunch items using commas.
    var items = $scope.lunchItems.split(",");
    var itemCount = 0;

    // Count only items that are not empty.
    // Empty items between commas, such as ", ,", are ignored.
    for (var i = 0; i < items.length; i++) {
      if (items[i].trim() !== "") {
        itemCount++;
      }
    }

    // If there were only commas/spaces, treat the input as empty.
    if (itemCount === 0) {
      $scope.message = "Please enter data first";
      $scope.messageClass = "error";
      $scope.inputClass = "error-border";
    }
    else if (itemCount <= 3) {
      $scope.message = "Enjoy!";
      $scope.messageClass = "success";
      $scope.inputClass = "success-border";
    }
    else {
      $scope.message = "Too much!";
      $scope.messageClass = "success";
      $scope.inputClass = "success-border";
    }
  };

}

})();