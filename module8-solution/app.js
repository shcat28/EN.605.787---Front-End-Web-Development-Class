
(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);

  // Controller
  NarrowItDownController.$inject = ['MenuSearchService'];

  function NarrowItDownController(MenuSearchService) {
    var narrow = this;

    narrow.searchTerm = '';
    narrow.found = [];
    narrow.searched = false;
    narrow.error = false;

    narrow.search = function () {
      narrow.found = [];
      narrow.searched = false;
      narrow.error = false;

      var searchTerm = narrow.searchTerm.trim();

      // Handle empty search
      if (searchTerm === '') {
        narrow.searched = true;
        return;
      }

      // Retrieve matching menu items
      MenuSearchService.getMatchedMenuItems(searchTerm)
        .then(function (foundItems) {
          narrow.found = foundItems;
          narrow.searched = true;
        })
        .catch(function (error) {
          narrow.error = true;
          console.error('Error retrieving menu:', error);
        });
    };

    // Remove an item by index
    narrow.removeItem = function (index) {
      narrow.found.splice(index, 1);
    };
  }

  // Service
  MenuSearchService.$inject = ['$http'];

  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: 'GET',
        url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
      }).then(function (response) {
        var menuItems = response.data;
        var foundItems = [];

        searchTerm = searchTerm.toLowerCase();

        // Loop through all menu categories
        angular.forEach(menuItems, function (category) {

          // Loop through items in each category
          angular.forEach(category.menu_items, function (item) {

            if (item.description &&
                item.description.toLowerCase().indexOf(searchTerm) !== -1) {
              foundItems.push(item);
            }

          });

        });

        return foundItems;
      });
    };
  }

  // Directive
  function FoundItemsDirective() {
    return {
      restrict: 'E',
      scope: {},
      bindToController: {
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsController,
      controllerAs: 'items',
      templateUrl: 'foundItems.html'
    };
  }

  function FoundItemsController() {
    var items = this;

    items.remove = function (index) {
      items.onRemove({ index: index });
    };
  }

})();
