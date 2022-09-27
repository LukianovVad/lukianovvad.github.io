define([], function() {
    'use strict';

    return function ProductsViewModel(params) {
        const self = this;

        self.productGrid = params.parent.productGrid;

        self.checkUrlImage = function(str) {
            return str === undefined ? '/images/placeholder.png' : str.url;
        };
    };
});