(function () {
  "use strict";

  angular.module('common')
    .service('MenuService', MenuService);

  function shortNameDirectoryBuilder(shortName) {
    var category = '';
    var number = '';
    var finalDirectory = '';
    for (var i = 0; i < shortName.length; i++) {
      if (isNaN(shortName.charAt(i))) {
        category += shortName.charAt(i);
      }
      else {

        number += shortName.charAt(i);
      }
    }
    finalDirectory = `/menu_items/${category.toUpperCase()}/menu_items/${number}.json`
    return { 
      directory: finalDirectory, 
      imgData: [category, number]
    };
  }


  MenuService.$inject = ['$http', 'ApiPath'];
  function MenuService($http, ApiPath) {
    var service = this;

    service.getCategories = function () {
      return $http.get(ApiPath + '/categories.json').then(function (response) {
        return response.data;
      });
    };


    service.getMenuItems = function (category) {
      var config = {};
      if (category) {
        config.params = { 'category': category };
      }

      return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
        return response.data;
      });
    };

    service.getMenuItem = function (shortName) {
      const directories = shortNameDirectoryBuilder(shortName);
      return $http.get(ApiPath + directories.directory).then(function (response) {
        var data = {
          ...response.data,
          imageData: directories.imgData
        };
        return data;
      });
    }
  }
})();