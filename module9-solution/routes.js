(function () {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html'
      })

      .state('categories', {
        url: '/categories',

        template: '<categories categories="categoriesCtrl.categories"></categories>',

        controller: 'CategoriesController',
        controllerAs: 'categoriesCtrl',

        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories()
              .then(function (response) {
                return response.data;
              });
          }]
        }
      })

      .state('items', {
        url: '/items/:categoryShortName',

        template: '<items items="itemsCtrl.items"></items>',

        controller: 'ItemsController',
        controllerAs: 'itemsCtrl',

        resolve: {
          items: ['MenuDataService', '$stateParams',
            function (MenuDataService, $stateParams) {
              return MenuDataService.getItemsForCategory(
                $stateParams.categoryShortName
              ).then(function (response) {
                return response.data.menu_items;
              });
            }
          ]
        }
      });

  }

})();
