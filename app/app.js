/*global angular*/
angular.module('app', [
    'LocalStorageModule'
]).config([
    'localStorageServiceProvider',
    function (localStorageServiceProvider) {
        localStorageServiceProvider.prefix = 'bloom';
    }
]);
