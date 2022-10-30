define([], () => {
    'use strict';

    return function ProductsViewModel(params) {
        const self = this;

        self.productsGrid = params.parent.productsGrid;

        self.getUrlImage = str => {
            return str === undefined ? '/images/placeholder.png' : str.url;
        };
    };
});