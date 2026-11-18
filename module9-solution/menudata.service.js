
(function () {
  'use strict';

  angular.module('data')
    .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http'];

  function MenuDataService($http) {
    var service = this;

    var baseUrl = 'https://coursera-jhu-default-rtdb.firebaseio.com';

    service.getAllCategories = function () {
      return $http.get(baseUrl + '/categories.json');
    };

    service.getItemsForCategory = function (categoryShortName) {
      return $http.get(
        baseUrl + '/menu_items/' +
        encodeURIComponent(categoryShortName) + '.json'
      );
    };
  }

})();
