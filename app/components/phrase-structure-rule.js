/*global angular, FidPsr*/
angular.module('app').service('phraseStructureRule', [
    function () {
        var psr;

        psr = new FidPsr();
        psr.rules = {
            'cold': [ 'cold', 'chilly', 'freezing' ],
            'good-day': [ '{{is-a}} {{good}} day' ],
            'good': [ 'good', 'great', 'wonderful', 'spiffy', 'fantastic', 'pleasant', 'joyous', 'marvelous' ],
            'hot': [ 'hot', 'toasty', 'roasty-toasty' ],
            'is-a': [ 'is a', 'shall be a', 'is forecasted as a', 'will be a', 'shows signs to be a' ],
            'too': [ 'too', 'excessively', 'overly' ],
            'too-hot': [ '{{will-be}} {{too}} {{hot}}' ],
            'too-cold': [ '{{will-be}} {{too}} {{cold}}' ],
            'will-be': [ 'will be', 'shall be', 'is likely to be', 'is expected to be' ]
        };

        return function (input) {
            return psr.generate(input);
        };
    }
]);
