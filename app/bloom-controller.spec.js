/*global beforeEach, describe, expect, inject, it, jasmine*/
describe('BloomController', function () {
    var init, localStorageService, $scope;

    beforeEach(module('app'));
    beforeEach(inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();
        localStorageService = jasmine.createSpyObj('localStorageService', [
            'get',
            'remove',
            'set'
        ]);
        init = function () {
            $controller('BloomController', {
                localStorageService: localStorageService,
                $scope: $scope
            });
        };
    }));

    describe('when there was saved data', function () {
        beforeEach(function () {
            localStorageService.get.and.callFake(function (key) {
                if (key === 'wundergroundKey') {
                    return 'ApiKeyForWU';
                }
                if (key === 'userSettings') {
                    return {
                        user: 'settings'
                    };
                }
            });
            init();
        });
        it('loads the key', function () {
            expect($scope.apiKey).toBe('ApiKeyForWU');
        });
        it('sets user settings', function () {
            expect($scope.userSettings).toEqual({
                user: 'settings'
            });
        });
    });

    describe('without a saved api key', function () {
        beforeEach(function () {
            init();
        });
        it('has an undefined key', function () {
            expect($scope.apiKey).toBe(undefined);
        });
        it('has an empty object for user settings', function () {
            expect($scope.userSettings).toEqual({});
        });
    });

    describe('setApiKey', function () {
        beforeEach(function () {
            init();
        });

        it('assigns an empty key', function () {
            $scope.apiKey = 'monkey';
            $scope.$emit('setApiKey', null);
            expect($scope.apiKey).toBe(null);
        });
        it('assigns a key', function () {
            expect($scope.apiKey).toBe(undefined);
            $scope.$emit('setApiKey', 'banana');
            expect($scope.apiKey).toBe('banana');
        });
        it('removes from local storage', function () {
            $scope.$emit('setApiKey', null);
            expect(localStorageService.remove).toHaveBeenCalledWith('wundergroundKey');
        });
        it('adds to local storage', function () {
            $scope.$emit('setApiKey', 'peanuts');
            expect(localStorageService.set).toHaveBeenCalledWith('wundergroundKey', 'peanuts');
        });
    });
    describe('apiKey changing', function () {
        beforeEach(function () {
            init();
        });
        it('sets the template to api-key when provided a falsy value', function () {
            $scope.$apply(function () {
                $scope.template = 'this should get changed';
                $scope.apiKey = false;
            });
            expect($scope.template).toBe('app/api-key.html');
        });
        it('sets a template to forecast when there is a key', function () {
            $scope.$apply(function () {
                $scope.template = 'this should get changed';
                $scope.apiKey = 'chimpanzee';
            });
            expect($scope.template).toBe('app/forecast.html');
        });
    });
    describe('userSettings changing', function () {
        it('saves to local storage', function () {
            expect(localStorageService.set).not.toHaveBeenCalled();
            $scope.$apply(function () {
                $scope.userSettings = {
                    temperature: 76
                };
            });
            expect(localStorageService.set).not.toHaveBeenCalledWith('userSettings', {
                temperature: 76
            });
        });
    });
});
