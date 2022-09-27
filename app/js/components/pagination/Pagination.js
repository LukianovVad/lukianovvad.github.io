define(['ko'], function (ko) {
    'use strict';

    return function PaginationViewModel(params) {
        const self = this;

        self.data_two = params.parent.data_two;

        self.productGrid = params.parent.productGrid;

        self.pageSize = params.parent.pageSize;

        self.currentPage = params.parent.currentPage;

        self.totalPages = ko.computed(function () {
            const res = Math.ceil(self.data_two().length / self.pageSize());

            return Array.from({ length: res }, (v, i) => ++i);
        });

        self.test = ko.computed(function () {
            if (self.totalPages().length > 3) {
                if (self.currentPage() <= 2) {
                    const start = 0;
                    const end = 3;
                    const a = self.totalPages().slice(start, end);

                    return a;
                }

                if (self.currentPage() === self.totalPages().length) {
                    const start = self.currentPage.length - 3;
                    const end = self.currentPage().length;
                    const a = self.totalPages().slice(start, end);

                    return a;
                }

                if (self.currentPage() >= 3 && self.currentPage() !== self.totalPages().length) {
                    const start = self.currentPage() - 2;
                    const end = self.currentPage() + 1;
                    const a = self.totalPages().slice(start, end);

                    return a;
                }
            }

            return self.totalPages();
        });

        self.paginated = ko.computed(function () {
            const start = self.pageSize() * (self.currentPage() - 1);
            const end = start + self.pageSize();
            const a = self.data_two().slice(start, end);

            return self.productGrid(a);
        });

        self.prevPage = function () {
            const prevPage = self.currentPage() - 1;

            self.currentPage(prevPage);
            console.log('prevPage');

        };

        self.nextPage = function () {
            const nextPage = self.currentPage() + 1;

            self.currentPage(nextPage);
            console.log('nextPage');

        };

        self.firstPage = function () {
            self.currentPage(1);
            console.log(self.currentPage());
        };

        self.lastPage = function () {
            self.currentPage(self.totalPages().length);
            console.log(self.currentPage());
        };

        self.selectPage = function (modal, event) {
            self.currentPage(+event.target.innerText);
        };
    };
});