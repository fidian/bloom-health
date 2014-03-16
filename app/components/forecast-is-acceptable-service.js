/*global angular*/
angular.module('app').service('forecastIsAcceptable', [
    'phraseStructureRule',
    function (phraseStructureRule) {
        function getDayResult(day, settings) {
            var high;

            high = day.high.fahrenheit;

            if (high > settings.temp + settings.range) {
                return 'too-hot';
            }

            if (high < settings.temp - settings.range) {
                return 'too-cold';
            }

            return 'good-day';
        }

        return function (forecast, settings) {
            angular.forEach(forecast, function (day) {
                day.resultCode = getDayResult(day, settings);
                day.resultString = phraseStructureRule('{{' + day.resultCode + '}}');
            });
            
            return forecast;
        };
    }
]);
