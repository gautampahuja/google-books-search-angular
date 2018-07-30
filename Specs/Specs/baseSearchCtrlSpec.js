(function () {
    'use strict';

    describe('app.controllers BaseSearchCtrl', function () {
        var $scope, ctrl;
        var searchServiceMock = {};

        beforeEach(function () {
            module('app.controllers');
            inject(function ($rootScope, $controller) {
                $scope = $rootScope.$new();

                ctrl = $controller('BaseSearchCtrl', {
                    $scope: $scope,
                    searchService: searchServiceMock
                });
            });
        });

        it('BaseSearchCtrl does exist', function () {
            expect(ctrl).toBeDefined();
        });
    });
}());