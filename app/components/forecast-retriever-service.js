/*global angular*/
angular.module('app').service('forecastRetriever', [
    '$http',
    '$q',
    function ($http, $q) {
        return function (apiKey) {
            function getApi(path) {
                // Caution - WUnderground's API does not use CORS
                return $http.jsonp("http://api.wunderground.com/api/" + apiKey + path +".json?callback=JSON_CALLBACK").then(function (response) {
                    var isError;

                    isError = false;

                    try {
                        if (response.data.response.error) {
                            isError = true;
                        }
                    } catch (ignore) {}

                    if (isError) {
                        return $q.reject(response);
                    }

                    return response;
                });
            }

            return getApi("/geolookup/q/autoip").then(function (response) {
                var locationUri;

                try {
                    locationUri = response.data.location.l;
                } catch (ignore) {}

                if (!locationUri) {
                    return $q.reject(new Error('Unable to determine location'));
                }

                // We should have a location.  Now get the forecast.
                return getApi('/forecast' + locationUri);
            }).then(function (response) {
                return response.data.forecast.simpleforecast.forecastday;
            });
        };
    }
]);
