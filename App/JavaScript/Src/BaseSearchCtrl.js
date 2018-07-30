(function() {
    'use strict';

    var appControllers = angular.module('app.controllers', []);

    appControllers.controller('BaseSearchCtrl', function() {
        var vm = this;
        vm.results = '';
        vm.query = '';
        vm.orderProp = 'volumeInfo.title';
    });
}());
