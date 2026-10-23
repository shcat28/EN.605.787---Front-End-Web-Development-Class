
(function () {
  'use strict';

  // Declare AngularJS application module
  angular.module('ShoppingListCheckOff', [])

  // To Buy Controller
  .controller('ToBuyController', [
    'ShoppingListCheckOffService',
    function (ShoppingListCheckOffService) {
      var toBuy = this;

      // Reference to the To Buy list stored in the service
      toBuy.items = ShoppingListCheckOffService.getToBuyItems();

      // Move an item to the Already Bought list
      toBuy.buyItem = function (itemIndex) {
        ShoppingListCheckOffService.buyItem(itemIndex);
      };
    }
  ])

  // Already Bought Controller
  .controller('AlreadyBoughtController', [
    'ShoppingListCheckOffService',
    function (ShoppingListCheckOffService) {
      var bought = this;

      // Reference to the Already Bought list stored in the service
      bought.items = ShoppingListCheckOffService.getBoughtItems();
    }
  ])

  // Shared Singleton Service
  .service('ShoppingListCheckOffService', function () {
    var service = this;

    // Initial list of items to buy
    // Each item contains a name, quantity, and numeric pricePerItem
    var toBuyItems = [
      { name: 'cookies', quantity: 10, pricePerItem: 2.00 },
      { name: 'apples', quantity: 5, pricePerItem: 1.50 },
      { name: 'milk', quantity: 2, pricePerItem: 4.00 },
      { name: 'bread', quantity: 3, pricePerItem: 3.00 },
      { name: 'eggs', quantity: 12, pricePerItem: 0.50 }
    ];

    // Initially empty Already Bought list
    var boughtItems = [];

    // Return the To Buy array
    service.getToBuyItems = function () {
      return toBuyItems;
    };

    // Return the Already Bought array
    service.getBoughtItems = function () {
      return boughtItems;
    };

    // Move an item from To Buy to Already Bought
    service.buyItem = function (itemIndex) {
      if (itemIndex >= 0 && itemIndex < toBuyItems.length) {
        var item = toBuyItems[itemIndex];

        // Validate the quantity before purchasing
        if (!Number.isInteger(item.quantity) || item.quantity < 1) {
          return;
        }

        // Remove item from To Buy list
        toBuyItems.splice(itemIndex, 1);

        // Add item to Already Bought list
        boughtItems.push(item);
      }
    };
  })

  // Custom Angular Dollars Filter
  .filter('angularDollars', function () {
    return function (input) {
      // Convert total price to a number
      var total = Number(input);

      // Return price with three dollar signs and two decimals
      return '$$$' + total.toFixed(2);
    };
  });

})();
