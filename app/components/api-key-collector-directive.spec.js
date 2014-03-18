/*global angular, beforeEach, describe, expect, inject, it, jasmine*/
describe('apiKeyCollector', function () {
    var compile, element, $parent, $scope;

    beforeEach(module('app'));
    beforeEach(inject(function ($templateCache, $rootScope, $compile) {
        $templateCache.put('app/components/api-key-collector-directive.html', '<div></div>');
        element = angular.element('<div api-key-collector></div>');
        $parent = $rootScope.$new();
        $scope = $parent.$new();
        compile = function () {
            $compile(element)($scope);
            $scope.$digest();
        };
    }));
    it('begins with a blank key initially', function () {
        $parent.key = 'abc123';
        compile();
        expect(element.scope().key).toBe('');
    });
    describe('copyApiKey', function () {
        it('emits the current key', function () {
            var spyFn;

            spyFn = jasmine.createSpy('setApiKey');
            spyFn.and.callFake(function (event, apiKey) {
                /*jslint unparam:true*/
                expect(apiKey).toBe('test123');
            });
            compile();
            $scope.key = 'test123';
            $parent.$on('setApiKey', spyFn);
            $scope.copyApiKey();
            expect(spyFn).toHaveBeenCalled();
        });
    });
});
