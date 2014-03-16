/*global angular*/
angular.module('app').directive('goodDaySettings', [
    function () {
        return {
            link: function ($scope) {
                var settings;

                settings = $scope.goodDaySettings || {};

                if (settings.range === undefined) {
                    settings.range = 5;
                }

                if (settings.temp === undefined) {
                    settings.temp = 72;
                }
            },
            restrict: "AC",
            scope: {
                goodDaySettings: '='
            },
            templateUrl: 'app/components/good-day-settings-directive.html'
        };
    }
]);
