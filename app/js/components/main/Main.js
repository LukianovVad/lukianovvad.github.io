define([
    'jquery',
    'ko'
], ($, ko) => {
    'use strict';

    return function MainViewModel() {
        const self = this;

        self.url = '/js/model/product.json';
        self.json = null;
        self.products = ko.observableArray();
        self.productsGrid = ko.observableArray();
        self.pageSize = ko.observable(8);
        self.currentPage = ko.observable(1);
        self.selectedSort = ko.observable();

        self.getJson = () => {
            const arr = [];

            $.getJSON(self.url, json => {
                Object.keys(json).forEach(elem => {
                    arr.push(json[elem]);
                });
                self.json = arr;
                self.products(self.json);
            });
        };

        self.getJson();
    };
});