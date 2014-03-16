/*global angular*/
angular.module('app').directive('forecast', [
    'localStorageService',
    'forecastRetriever',
    function (localStorageService, forecastRetriever) {
        return {
            link: function ($scope) {
                function setTemplate(name) {
                    $scope.template = 'app/components/forecast-directive-' + name + '.html';
                }

                setTemplate('loading');
                forecastRetriever($scope.apiKey).then(function (personalizedForecast) {
                    $scope.forecast = personalizedForecast;
                    console.log(personalizedForecast);
                    setTemplate('good');
                }, function (err) {
                    try {
                        if (err.data.response.error.type === 'keynotfound') {
                            $scope.$emit('setApiKey', '');
                            return '';
                        }
                    } catch (ignore) {}

                    setTemplate('error');
                    $scope.error = err.toString();
                });
            },
            template: '<div ng-include="template"></div>'
        };
    }
]);
