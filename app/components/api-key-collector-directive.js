/*global angular*/
angular.module('app').directive('apiKeyCollector', [
    function () {
        return {
            link: function ($scope) {
                $scope.key = '';
                $scope.copyApiKey = function () {
                    $scope.$emit('setApiKey', $scope.key);
                };
            },
            templateUrl: 'app/components/api-key-collector-directive.html'
        };
    }
]);
