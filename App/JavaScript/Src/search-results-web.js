(function() {
    'use strict';

    var appDirectives = angular.module('app.directives');

    appDirectives.directive('searchResultsWeb', ['searchService', '$location', function(searchService, $location) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                results: '=ngModel',
                order: '=orderProp'
            },
            templateUrl:'App/Templates/search-results.html',
            link: function(scope) {
                scope.currentPage = 1;
                scope.showDetails = function(id) {
                    $location.url('details?id=' + id);
                };
                scope.changePage = function(startIndex) {
                    var query = $location.search().q;
                    searchService.searchBooks(query, startIndex - 1).then(function(resp) {
                        scope.results = resp;
                    });
                };
            }
        };
    }]);
}());
