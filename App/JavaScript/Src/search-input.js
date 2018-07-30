(function() {
    'use strict';

    var appDirectives = angular.module('app.directives');

    appDirectives.directive('searchInput', ['searchService', '$location', function(searchService, $location) {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                results: '=ngModel',
                order: '=orderProp',
                query: '=value'
            },
            template: [
                '<div>',
                    '<form name="searchForm" novalidate ng-submit="search(searchForm.$valid, query, 0)">',
                        '<input type="search" ng-model="query" placeholder="Search any Book" class="search-form__input" required />',
                        '<button type="submit" class="btn search-form__btn">',
                            '<span ng-show="!isLoading">Search</span><i ng-show="isLoading" class="animate-spin icon-spin1"></i>',
                        '</button>',
                    '</form>',
                    '<label ng-show="results.items.length>0" class="sort-by-options">Sort by:',
                        '<select ng-change="changedvalue()" id="option" ng-model="order">',
                            '<option value="volumeInfo.authors">Author</option>',
                            '<option selected="selected" value="volumeInfo.title">Title</option>',
                            '<option selected="selected" value="volumeInfo.publishedDate">Published Date</option>',
                        '</select>',
                    '</label>',
                '</div>'
            ].join(''),
            link: function(scope) {
                scope.changedvalue = function() {
                    console.log(scope.order);
                    scope.option = true;
                };
                scope.isLoading = false;
                scope.search = function(valid, query, startIndex) {
                    if (valid) {
                        scope.isLoading = true;
                        searchService.searchBooks(query, startIndex).then(function(resp) {
                            scope.results = resp;
                            scope.isLoading = false;
                            $location.search('q', query);
                        });
                    }
                };
                if ($location.search().q !== undefined) {
                    scope.query = $location.search().q;
                    scope.search(true, $location.search().q, 0);
                }
            }
        };
    }]);
}());
