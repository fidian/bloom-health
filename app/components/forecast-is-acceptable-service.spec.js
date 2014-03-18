/*global angular, beforeEach, describe, expect, inject, it, jasmine*/
describe('forecastIsAcceptable', function () {
    var service, psr;

    beforeEach(module('app', function ($provide) {
        psr = jasmine.createSpy('psr');
        $provide.value('phraseStructureRule', psr);
    }));
    beforeEach(inject(function (forecastIsAcceptable) {
        service = forecastIsAcceptable;
    }));
    it('sets a resultString for each day', function () {
        psr.and.callFake(function (input) {
            return input;
        });
        expect(service([
            {
                high: {
                    fahrenheit: 41
                }
            },
            {
                high: {
                    fahrenheit: 42
                }
            },
            {
                high: {
                    fahrenheit: 58
                }
            },
            {
                high: {
                    fahrenheit: 59
                }
            }
        ], {
            range: 8,
            temp: 50
        })).toEqual([
            {
                high: {
                    fahrenheit: 41
                },
                resultCode: 'too-cold',
                resultString: '{{too-cold}}'
            },
            {
                high: {
                    fahrenheit: 42
                },
                resultCode: 'good-day',
                resultString: '{{good-day}}'
            },
            {
                high: {
                    fahrenheit: 58
                },
                resultCode: 'good-day',
                resultString: '{{good-day}}'
            },
            {
                high: {
                    fahrenheit: 59
                },
                resultCode: 'too-hot',
                resultString: '{{too-hot}}'
            }
        ]);
    });
});
