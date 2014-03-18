/*global angular, beforeEach, describe, expect, inject, it, module*/
describe('forecastRetriever', function () {
    var $httpBackend, service;

    beforeEach(module('app'));
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        service = $injector.get('forecastRetriever');
    }));
    it('rejects the promise if the autoip lookup fails', function () {
        var promise, promiseStatus;

        $httpBackend.when('JSONP', /apiKey\/geolookup\/q\/autoip/).respond(404, '');
        promise = service('apiKey');
        promise.then(function () {
            promiseStatus = true;
        }, function (err) {
            promiseStatus = false;
            expect(err.status).toBe(404);
        });
        $httpBackend.flush();
        expect(promiseStatus).toBe(false);
    });
    it('rejects the promise if the data says there is an error', function () {
        var promise, promiseStatus;

        $httpBackend.when('JSONP', /apiKey\/geolookup\/q\/autoip/).respond(200, {
            response: {
                error: 'some error'
            }
        });
        promise = service('apiKey');
        promise.then(function () {
            promiseStatus = true;
        }, function (err) {
            promiseStatus = false;
            expect(err.status).toBe(200);
        });
        $httpBackend.flush();
        expect(promiseStatus).toBe(false);
    });
    it('rejects the promise if the data omits a location', function () {
        var promise, promiseStatus;

        $httpBackend.when('JSONP', /apiKey\/geolookup\/q\/autoip/).respond(200, {});
        promise = service('apiKey');
        promise.then(function () {
            promiseStatus = true;
        }, function (err) {
            promiseStatus = false;
            expect(err.toString()).toContain('Unable to determine location');
        });
        $httpBackend.flush();
        expect(promiseStatus).toBe(false);
    });
    it('rejects the promise if the forecast fails', function () {
        var promise, promiseStatus;

        $httpBackend.when('JSONP', /apiKey\/geolookup\/q\/autoip/).respond(200, {
            location: {
                l: '/abc123'
            }
        });
        $httpBackend.when('JSONP', /apiKey\/forecast\/abc123/).respond(502, '');
        promise = service('apiKey');
        promise.then(function () {
            promiseStatus = true;
        }, function (err) {
            promiseStatus = false;
            expect(err.status).toBe(502);
        });
        $httpBackend.flush();
        expect(promiseStatus).toBe(false);
    });
    it('returns the forecast', function () {
        var promise, promiseStatus;

        $httpBackend.when('JSONP', /apiKey\/geolookup\/q\/autoip/).respond(200, {
            location: {
                l: '/abc123'
            }
        });
        $httpBackend.when('JSONP', /apiKey\/forecast\/abc123/).respond(200, {
            forecast: {
                simpleforecast: {
                    forecastday: 'hey this is it'
                }
            }
        });
        promise = service('apiKey');
        promise.then(function (result) {
            promiseStatus = true;
            expect(result).toBe('hey this is it');
        }, function () {
            promiseStatus = false;
        });
        $httpBackend.flush();
        expect(promiseStatus).toBe(true);
    });
});
