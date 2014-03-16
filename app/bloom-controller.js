/*global angular*/
angular.module('app').controller('AppController', [
    '$scope',
    'localStorageService',
    function ($scope, localStorageService) {
        'use strict';

        var lsWunderground;

        lsWunderground = 'wundergroundKey';
        $scope.$on('setApiKey', function (event, newKey) {
            /*jslint unparam:true*/

            $scope.apiKey = newKey;

            if (newKey) {
                localStorageService.set(lsWunderground, newKey);
            } else {
                localStorageService.remove(lsWunderground);
            }
        });

        $scope.apiKey = localStorageService.get(lsWunderground);
        $scope.$watch('apiKey', function (apiKey) {
            if (apiKey) {
                $scope.template = 'app/forecast.html';
            } else {
                $scope.template = 'app/api-key.html';
            }
        });
    }
]);
