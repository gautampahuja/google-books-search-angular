(function () {
    'use strict';

    var searchService, httpBackend;
    describe("app.services searchServiceSpec", function () {
        beforeEach(function () {
            module('app.services');
            inject(function (_searchService_, $httpBackend) {
                searchService = _searchService_;
                httpBackend = $httpBackend;
            })
        });

        it('does exist', function () {
            expect(searchService).not.toBeNull();
        });

        it('searchServiceSpec contains a search() method', inject(function (searchService) {
            expect(searchService.search).toBeDefined();
        }));

        //it('searchServiceSpec search() returns a search result when called', inject(function (searchService) {
        //    httpBackend.whenGET("https://api.datamarket.azure.com/Bing/Search/v1/Composite").respond(
        //        {
        //            "data": {
        //                "d": {
        //                    "results":
        //                        [{
        //                            "Web": [],
        //                            "Image": [],
        //                            "Video": [],
        //                            "News": []
        //                        }]
        //                }
        //            }
        //        }
        //    );

        //    searchService.search("car").then(function (results) {
        //        console.log(results);
        //        expect(results).toBeDefined();
        //    });

        //    httpBackend.flush();
        //}));
    });
}());