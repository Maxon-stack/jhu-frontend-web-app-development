(function () {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['UsersService', 'MenuService'];
  function SignUpController(UsersService, MenuService) {
    var $ctrl = this;
    $ctrl.registrationSuccess = false;
    $ctrl.favoriteDishFound = false;
    $ctrl.dishEmpty = false;
    $ctrl.testValue = 'A8'; //Displayed as a debug tool to show that controller working
    $ctrl.dishChanged = function (event) {
      $ctrl.favoriteDishFound = false;
    };
    $ctrl.dishValidation = function (event) {
      if (!$ctrl.favoriteDish) {
        $ctrl.dishEmpty = true;
        return;
      }
      MenuService.getMenuItem($ctrl.favoriteDish)
        .then(function (data) {
          if (data) {
            $ctrl.dishEmpty = false
            $ctrl.favoriteDishFound = true;
          }
          else {
            $ctrl.favoriteDishFound = false;
          }
        });
    };

    $ctrl.signUp = function (event) {
      event.preventDefault();
      var user = {
        firstName: $ctrl.firstName,
        lastName: $ctrl.lastName,
        email: $ctrl.email,
        phone: $ctrl.phone,
        favoriteDish: $ctrl.favoriteDish
      };
      MenuService.getMenuItem($ctrl.favoriteDish)
        .then(function (data) {
          const favoriteMenuItemImgPath = 'images/menu/' + data.imageData[0] + '/' + data.imageData[0] + data.imageData[1] + '.jpg';
          data = {
            ...data,
            imgPath: favoriteMenuItemImgPath
          }
          user.favoriteMenuItem = data;
          UsersService.setUser(user);
          $ctrl.favoriteDishFound = true;
          $ctrl.registrationSuccess = true;
        }, function (err) {
          UsersService.setUser(user);
          $ctrl.favoriteDishFound = false;
          $ctrl.registrationSuccess = true;
        });
    };
  }
})();