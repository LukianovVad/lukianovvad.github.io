define(['ko'], ko => {
    'use strict';

    return function PaginationViewModel(params) {
        const self = this;

        self.products = params.parent.products;
        self.productsGrid = params.parent.productsGrid;
        self.pageSize = params.parent.pageSize;
        self.currentPage = params.parent.currentPage;

        self.totalPages = ko.computed(() => {
            const res = Math.ceil(self.products().length / self.pageSize());

            return Array.from({ length: res }, (v, i) => ++i);
        });

        self.paginated = ko.computed(() => {
            if (self.totalPages().length > 3) {
                if (self.currentPage() <= 2) {
                    return self.totalPages().slice(0, 3);
                }

                if (self.currentPage() === self.totalPages().length) {
                    return self.totalPages().slice(self.currentPage.length - 3, self.currentPage().length);
                }

                if (self.currentPage() >= 3 && self.currentPage() !== self.totalPages().length) {
                    return self.totalPages().slice(self.currentPage() - 2, self.currentPage() + 1);
                }
            }

            return self.totalPages();
        });

        self.getProductsGrid = ko.computed(() => {
            const start = self.pageSize() * (self.currentPage() - 1);
            const end = start + self.pageSize();
            const res = self.products.slice(start, end);

            return self.productsGrid(res);
        });

        self.prevPage = () => {
            const prevPage = self.currentPage() - 1;

            self.currentPage(prevPage);
        };

        self.nextPage = () => {
            const nextPage = self.currentPage() + 1;

            self.currentPage(nextPage);
        };

        self.firstPage = () => {
            self.currentPage(1);
        };

        self.lastPage = () => {
            self.currentPage(self.totalPages().length);
        };

        self.selectPage = (model, event) => {
            self.currentPage(+event.target.innerText);
        };
    };
});