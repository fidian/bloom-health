/*global angular*/
angular.module('app').directive('forecast', [
    'forecastRetriever',
    'forecastIsAcceptable',
    function (forecastRetriever, forecastIsAcceptable) {
        return {
            link: function ($scope) {
                function setTemplate(name) {
                    $scope.template = 'app/components/forecast-directive-' + name + '.html';
                }

                setTemplate('loading');
                forecastRetriever($scope.apiKey).then(function (personalizedForecast) {
                    $scope.forecast = forecastIsAcceptable(personalizedForecast, $scope.userSettings);
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

                $scope.$watchCollection('userSettings', function () {
                    if ($scope.forecast) {
                        $scope.forecast = forecastIsAcceptable($scope.forecast, $scope.userSettings);
                    }
                });
            },
            template: '<div ng-include="template"></div>'
        };
    }
]);
