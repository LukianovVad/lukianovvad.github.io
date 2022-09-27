define(['ko'], function (ko) {
    'use strict';

    return function ToolbarViewModel(params) {
        const self = this;

        self.data_two = params.parent.data_two;

        self.pageSize = params.parent.pageSize;

        self.currentPage = params.parent.currentPage;

        self.sortValue = ko.observable();

        self.pageSizeValue = ko.observable();

        self.selectPageSize = function() {
            self.currentPage(1);
            self.pageSize(+self.pageSizeValue());
            console.log(self.pageSize());
        };

        self.sortLogic = function() {
            if (self.sortValue() === 'fromCheapToExpensive') {
                console.log('fromCheapToExpensive');
                console.log(self.data_two());

                self.data_two.sort(function (a, b) {
                    return a.price - b.price;
                });
            }

            if (self.sortValue() === 'fromExpensiveToCheap') {
                console.log('fromExpensiveToCheap');
                console.log(self.data_two());

                self.data_two.sort(function (a, b) {
                    return b.price - a.price;
                });
            }

            if (self.sortValue() === '') {
                self.data_two.sort(function (a, b) {
                    return a.entity_id - b.entity_id;
                });
            }
        };
    };
});