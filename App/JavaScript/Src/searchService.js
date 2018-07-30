(function() {
    'use strict';

    var appServices = angular.module('app.services', []);
    appServices.factory('searchService', ['$http', '$q', function($http, $q) {
        var API_KEY = 'AIzaSyB5CIjhocIBxkTbsxCWkbd28qfQF0CdnOE';
        var maxResults = 20;
        var searchService = {
            searchBooks: searchBooks,
            getBookDetails: getBookDetails
        };

        function getBookDetails(id) {
            var url = 'https://www.googleapis.com/books/v1/volumes/' + id;
            var deferred = $q.defer();
            $http({
                url: url,
                method: 'GET',
                headers: {
                    callback: 'JSON_CALLBACK',
                    key: API_KEY
                }
            }).success(function(resp) {
                deferred.resolve(resp);
            }).error(function() {

            });
            return deferred.promise;
        }

        function searchBooks(query, startIndex) {
            var indexToStart = startIndex * maxResults;
            var url = 'https://www.googleapis.com/books/v1/volumes?startIndex=' + indexToStart + '&maxResults=' + maxResults + '&q=' + query;
            var deferred = $q.defer();
            $http({
                url: url,
                method: 'GET',
                headers: {
                    callback: 'JSON_CALLBACK',
                    key: API_KEY
                }
            }).success(function(resp) {
                deferred.resolve(resp);
            }).error(function() {
                deferred.resolve(-1);
            });
            return deferred.promise;
        }
        return searchService;
    }]);
}());
