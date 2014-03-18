/*global angular, beforeEach, expect, describe, inject, it, jasmine, module*/
describe('forecast', function () {
    var compile, element, forecastIsAcceptable, forecastRetriever, $parent, $scope;

    beforeEach(module('app', function ($provide) {
        forecastIsAcceptable = jasmine.createSpy('forecastIsAcceptable');
        forecastRetriever = jasmine.createSpy('forecastRetriever');
        $provide.value('forecastIsAcceptable', forecastIsAcceptable);
        $provide.value('forecastRetriever', forecastRetriever);
    }));
    beforeEach(inject(function ($templateCache, $rootScope, $compile, $q) {
        forecastRetriever.deferred = $q.defer();
        forecastRetriever.and.returnValue(forecastRetriever.deferred.promise);
        $templateCache.put('app/components/forecast-directive-error.html', 'loading');
        $templateCache.put('app/components/forecast-directive-good.html', 'good');
        $templateCache.put('app/components/forecast-directive-loading.html', 'loading');
        $parent = $rootScope.$new();
        element = angular.element('<div forecast></div>');
        $scope = $parent.$new();
        compile = function () {
            $compile(element)($scope);
            $scope.$digest();
        };
    }));
    it('sets an initial template', function () {
        compile();
        expect($scope.template).toBe('app/components/forecast-directive-loading.html');
    });
    it('watches userSettings and reevaluates an existing forecast', function () {
        compile();
        $scope.$apply(function () {
            $scope.forecast = true;
            $scope.userSettings = {
                'new settings': true
            };
        });
        expect(forecastIsAcceptable).toHaveBeenCalledWith(true, {
            'new settings': true
        });
    });
    it('watches userSettings and ignores updates if forecast is falsy', function () {
        compile();
        $scope.$apply(function () {
            // Forecast is initially falsy
            $scope.userSettings = {
                'new settings': true
            };
        });
        expect(forecastIsAcceptable).not.toHaveBeenCalled();
    });
    describe('forecastRetriever', function () {
        var setApiKey;

        beforeEach(function () {
            setApiKey = jasmine.createSpy('setApiKey');
            $parent.$on('setApiKey', setApiKey);
            compile();
        });
        it('catches API errors and emits instead', function () {
            var oldTemplate;

            setApiKey.and.callFake(function (event, apiKey) {
                /*jslint unparam:true*/
                expect(apiKey).toBe('');
            });
            oldTemplate = $scope.template;
            forecastRetriever.deferred.reject({
                data: {
                    response: {
                        error: {
                            type: 'keynotfound'
                        }
                    }
                }
            });
            $scope.$apply();
            expect(setApiKey).toHaveBeenCalled();
            expect($scope.template).toBe(oldTemplate);
        });
        it('shows an error template for all other errors', function () {
            forecastRetriever.deferred.reject(new Error('some reason'));
            $scope.$apply();
            expect($scope.template).toBe('app/components/forecast-directive-error.html');
            expect(setApiKey).not.toHaveBeenCalled();
        });
        it('sets the template and forecast on success', function () {
            $scope.userSettings = {
                user: 'settings'
            };
            forecastIsAcceptable.and.returnValue('the result');
            forecastRetriever.deferred.resolve({
                here: 'is your data'
            });
            $scope.$apply();
            expect(forecastIsAcceptable).toHaveBeenCalledWith({
                here: 'is your data'
            }, {
                user: 'settings'
            });
            expect($scope.forecast).toBe('the result');
            expect($scope.template).toBe('app/components/forecast-directive-good.html');
        });
    });
});
