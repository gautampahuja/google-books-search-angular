(function () {
    'use strict';

    beforeEach(function () {
        module('app.filters');
    });

    describe("app.filters durationTime", function () {
        it('does exist', inject(function ($filter) {
            expect($filter('durationTime')).not.toBeNull();
        }));

        it('should replace 0 with "0 minute"', inject(function (durationTimeFilter) {
            expect(durationTimeFilter(0)).toEqual('0 minute ');
        }));

        it('should replace 120000 with "2 minute"', inject(function (durationTimeFilter) {
            expect(durationTimeFilter(120000)).toEqual('2 minutes ');
        }));

        it('should replace 3600000 with "1 hour 0 minute"', inject(function (durationTimeFilter) {
            expect(durationTimeFilter(3600000)).toEqual('1 hour 0 minute ');
        }));

        it('should replace 7200000 with "2 hours 0 minute"', inject(function (durationTimeFilter) {
            expect(durationTimeFilter(7200000)).toEqual('2 hours 0 minute ');
        }));

        it('should replace 8640000 with "1 day 0 minute"', inject(function (durationTimeFilter) {
            expect(durationTimeFilter(86400000)).toEqual('1 day 0 minute ');
        }));
    });
}())