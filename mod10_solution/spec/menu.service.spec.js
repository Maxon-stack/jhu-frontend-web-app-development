describe('The menu service', function () {
  'use strict';
  var $httpBackend;
  var menuService;
  var ApiPath;
  var testData = {
    id: 658,
    short_name: "A1",
    imageData: ['A', '1'],
    name: "Won Ton Soup with Chicken",
    description: "chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
    price_small: 2.55,
    price_large: 5,
    small_portion_name: "pint",
    large_portion_name: "quart",
    created_at: "2016-08-05T19:42:00.140Z",
    updated_at: "2016-08-06T11:25:51.229Z",
    category_short_name: "A",
    image_present: true

  };
  beforeEach(function () {
    // Load module
    module('common');

    // Load any dependencies
    inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      menuService = $injector.get('MenuService');
      ApiPath = $injector.get('ApiPath');
    });
  });
  it('should retrieve A1 Menue Item', function() {
    $httpBackend.expectGET(ApiPath + '/menu_items/A/menu_items/1.json').respond(testData);
    menuService.getMenuItem('A1').then(function(item) {
      expect(item).toEqual(testData);
    });
    $httpBackend.flush();
  });
  it('should fail to retrieve A1 Menue Item', function() {
    $httpBackend.expectGET(ApiPath + '/menu_items/FAIL/menu_items/.json').respond(null);
    menuService.getMenuItem('Fail').then(function(item) {
      expect(item).toEqual({imageData: [ 'Fail', '' ]});
    });
    $httpBackend.flush();
  });
});
