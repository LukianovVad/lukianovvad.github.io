define([
    'ko',
    'underscore'
], (ko, _) => {
    'use strict';

    /* 
        colors: null, 15, 33, 32, 74, 37, 38
        sizes: null, 3, 4, 5, 6, 7
    */

    return function SidebarViewModel(params) {
        const self = this;

        self.json = params.parent.json;
        self.products = params.parent.products;
        self.currentPage = params.parent.currentPage;
        self.selectedOptions = ko.observableArray([]);
        self.filteredProductsByColor = ko.observableArray([]);
        self.filteredProductsBySize = ko.observableArray([]);

        self.colorArray = ko.observableArray([
            { propLabel: 'green', checkBoxValue: { propType: 'color', value: '15' }},
            { propLabel: 'red', checkBoxValue: { propType: 'color', value: '32' }},
            { propLabel: 'blue', checkBoxValue: { propType: 'color', value: '33' }},
            { propLabel: 'black', checkBoxValue: { propType: 'color', value: '74' }},
            { propLabel: 'tomato', checkBoxValue: { propType: 'color', value: '37' }},
            { propLabel: 'pink',checkBoxValue: { propType: 'color', value: '38' }} 
        ]);

        self.sizeArray = ko.observableArray([
            { propLabel: 'XS', checkBoxValue: { propType: 'size', value: '3' }},
            { propLabel: 'SM', checkBoxValue: { propType: 'size', value: '4' }},
            { propLabel: 'MD', checkBoxValue: { propType: 'size', value: '5' }},
            { propLabel: 'LG', checkBoxValue: { propType: 'size', value: '6' }},
            { propLabel: 'XL', checkBoxValue: { propType: 'size', value: '7' }}
        ]);

        self.selectedOptions.subscribe((newValue) => {
            const sorted = newValue.sort((prop1, prop2) => prop1['propType'] > prop2['propType'] ? 1 : -1);
            self.json = params.parent.json;
            self.filteredProductsByColor([]);
            self.filteredProductsBySize([]);

            sorted.forEach(item => {
                if (item.propType === 'color') {
                    self.json.forEach(elem => {
                        if (elem.color === item.value) self.filteredProductsByColor.push(elem);
                    });
                }

                if (item.propType === 'size') {
                    self.json.forEach(elem => {
                        if (elem.size === item.value) self.filteredProductsBySize.push(elem);
                    });
                }
            });

            self.filtering(self.filteredProductsByColor, self.filteredProductsBySize);
        });

        self.filtering = (filteredProductsByColor, filteredProductsBySize) => {
            self.currentPage(1);
            
            if (_.size(filteredProductsByColor()) === 0 && _.size(filteredProductsBySize()) === 0) {
                self.products(params.parent.json.map(el => el))
            } 
            
            if (_.size(filteredProductsByColor()) !== 0 &&  _.size(filteredProductsBySize()) === 0) {
                self.products(filteredProductsByColor());
            } 
            
            if (_.size(filteredProductsByColor()) === 0 && _.size(filteredProductsBySize()) !== 0) {
                self.products(self.filteredProductsBySize());
            } 
            
            if (_.size(filteredProductsByColor()) !== 0 && _.size(filteredProductsBySize()) !== 0) {
                self.products(_.intersection(filteredProductsByColor(), filteredProductsBySize()));
            }
        };
    };
});