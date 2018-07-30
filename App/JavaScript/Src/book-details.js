(function() {
    'use strict';
    var appDirectives = angular.module('app.directives');
    appDirectives.directive('bookDetails', ['searchService', '$location', function(searchService, $location) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
            },
            templateUrl:'App/Templates/details.html',
            link: function(scope) {
                var id = $location.search().id;
                searchService.
                    getBookDetails(id).then(function(resp) {
                        console.log(resp);
                        scope.details = resp;
                    });

            }
        };
    }]);
}());
