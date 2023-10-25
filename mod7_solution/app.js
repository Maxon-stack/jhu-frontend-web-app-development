
(function () {
  'use strict';
  angular.module('ShoppingList', [])
    .controller('ToBuyController', ToBuyController)
    .controller('CartController', CartController)
    .controller('AddtoList', AddtoList)
    .service('ShoppingListService', ShoppingListService);
  function ShoppingListService() {
    var service = this;
    var addItems = [
      {
        name: "Cookie",
        quantity: "10",
        pricePerItem: 2
      },
      {
        name: "Milk Carton",
        quantity: "10",
        pricePerItem: 6
      },
      {
        name: "Chip Bag",
        quantity: "10",
        pricePerItem: 4
      },
      {
        name: "Bread Loaf",
        quantity: "10",
        pricePerItem: 10
      },
      {
        name: "Cheese Slice",
        quantity: "10",
        pricePerItem: 1
      },
      {
        name: "Apples",
        quantity: "10",
        pricePerItem: 2
      }
    ];
    var cartItems = [];
    service.getaddItems = function functionName() {
      return addItems;
    }
    service.getInCartItems = function functionName() {
      return cartItems;
    }
    service.buyItem = function (itemIndex) {
      var item = addItems[itemIndex];
      item = {
        ...item,
        totalPrice: item.pricePerItem * item.quantity
      }
      cartItems.push(item);
      addItems.splice(itemIndex, 1);
    }
  }
  AddtoList.$inject = ['ShoppingListService'];
  function AddtoList(ShoppingListService) {
    var insert = this;
  }
  ToBuyController.$inject = ['ShoppingListService'];
  function ToBuyController(ShoppingListService) {
    var toBuy = this;
    toBuy.items = ShoppingListService.getaddItems();

    toBuy.buyItem = function (itemIndex) {
      ShoppingListService.buyItem(itemIndex);
    }
    toBuy.errorMessage = function () {
      if (toBuy.items.length > 0)
        return false;
      return true;
    }
  }
  CartController.$inject = ['ShoppingListService'];
  function CartController(ShoppingListService) {
    var cart = this;

    cart.items = ShoppingListService.getInCartItems();
    console.log(cart.items);

    cart.errorMessage = function () {
      if (cart.items.length > 0)
        return false;

      return true;
    }
  }
})();
