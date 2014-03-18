/*global angular, beforeEach, describe, expect, inject, it, module*/
describe('goodDaySettings', function () {
    var compile, element, $parent, $scope, settings;

    beforeEach(module('app'));
    beforeEach(inject(function ($templateCache, $rootScope, $compile) {
        $templateCache.put('app/components/good-day-settings-directive.html', '');
        element = angular.element('<div good-day-settings="settings"></div>');
        settings = {};
        $parent = $rootScope.$new();
        $parent.settings = settings;
        compile = function () {
            $compile(element)($parent);
            $parent.$digest();
            $scope = $parent.$$childHead;
        };
    }));
    it('initializes unset settings', function () {
        delete $parent.settings;
        compile();
        expect($scope.goodDaySettings).toEqual({
            range: 5,
            temp: 72
        });
    });
});
