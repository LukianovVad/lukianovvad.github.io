define(['ko'], ko => {
    'use strict';

    return function ToolbarViewModel(params) {
        const self = this;

        self.json = params.parent.json;
        self.products = params.parent.products;
        self.pageSize = params.parent.pageSize;
        self.currentPage = params.parent.currentPage;
        self.sortValue = ko.observable();
        self.pageSizeValue = ko.observable();

        self.pageSizeValue.subscribe(newValue => {
            self.currentPage(1);
            self.pageSize(+newValue);
        });

        self.sortValue.subscribe(newValue => {
            self.json = params.parent.json;

            if (self.json === null) return; 
            self.sorting(newValue); 
        });

        self.sorting = value => {
            switch (value) {
            case null:
                break;

            case 'fromCheapToExpensive':
                self.json.sort((a, b) => {
                    return a.price - b.price;
                });
                break;

            case 'fromExpensiveToCheap':
                self.json.sort((a, b) => {
                    return b.price - a.price;
                });
                break;

            case '':
                self.json.sort((a, b) => {
                    return a.entity_id - b.entity_id;
                });
            }

            self.products(self.json);
        };

        self.toggleSidebar = () => {
            document.body.addEventListener('click', (e) => {
                console.log('body');
                e.stopPropagation();
                document.querySelector('.products__sidebar').classList.remove('products__sidebar--active');
            });
            document.querySelector('.products__sidebar').classList.toggle('products__sidebar--active');
        };
    };
});