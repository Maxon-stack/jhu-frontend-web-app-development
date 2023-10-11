(function () {
    'use strict';

    angular.module('LunchCheck', [])

        .controller('LunchCheckController', LunchCheckController);
    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope, $filter) {

        $scope.text = "";
        $scope.message = "Please enter data first";
        $scope.CheckIt = function () {
            if ($scope.text.length > 0) {

                $scope.message = CheckIfTooMuch($scope.text);
            } else {
                $scope.message = "Please enter data first";
            }

        };

        function CheckIfTooMuch(string) {
            var words = string.split(',');
            var filteredSpaceEmpty = words.filter(function (word) {
                return word.split(' ').join('') != '';
            });

            if (filteredSpaceEmpty.length <= 3) {
                console.log(filteredSpaceEmpty)
                return "Enjoy!";

            } else {
                console.log(filteredSpaceEmpty)
                return "Too Much!";
            }
        }

    }


})();