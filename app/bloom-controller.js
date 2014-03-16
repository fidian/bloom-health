/*global angular*/
angular.module('app').controller('AppController', [
    '$scope',
    'localStorageService',
    function ($scope, localStorageService) {
        'use strict';

        var lsUserSettings, lsWunderground;

        lsWunderground = 'wundergroundKey';
        lsUserSettings = 'userSettings';
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
        $scope.userSettings = localStorageService.get(lsUserSettings) || {};
        $scope.$watch('apiKey', function (apiKey) {
            if (apiKey) {
                $scope.template = 'app/forecast.html';
            } else {
                $scope.template = 'app/api-key.html';
            }
        });
        $scope.$watchCollection('userSettings', function (newSettings) {
            localStorageService.set(lsUserSettings, newSettings);
        });
    }
]);
