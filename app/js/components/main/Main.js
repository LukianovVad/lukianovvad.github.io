define([
    'jquery',
    'ko'
], function ($, ko) {
    'use strict';

    return function MainViewModel() {
        const self = this;

        self.test = () => {
            console.log(self.data());
            console.log(self.data_two());
        };

        self.url = '/js/model/product.json';

        // self.data = ko.observableArray();

        self.data = null;

        self.data_two = ko.observableArray();

        self.productGrid = ko.observableArray();

        self.pageSize = ko.observable(8);

        self.currentPage = ko.observable(1);

        self.getJson = function () {
            const arr = [];

            $.getJSON(self.url, function (json) {
                Object.keys(json).forEach(function (elem) {
                    arr.push(json[elem]);
                });

                self.data = arr;
                self.data_two(self.data);
            });
        };

        self.getJson();
    };
});