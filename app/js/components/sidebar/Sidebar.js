define([
    'jquery',
    'ko',
    'underscore'
], function ($, ko, _) {
    'use strict';

    /* 
        colors: null, 15, 33, 32, 74, 37, 38
        sizes: null, 3, 4, 5, 6, 7
    */

    return function SidebarViewModel(params) {
        const self = this;

        self.data = params.parent.data;

        self.data_two = params.parent.data_two;

        self.selectedOptions = ko.observableArray([]);

        self.array1 = ko.observableArray([]);

        self.array2 = ko.observableArray([]);

        self.ArrayConstructor = function (propertyName, value) {
            this.propertyName = propertyName;
            this.value = value;
            this.visible = ko.computed(function () {
                self.data = params.parent.data;

                if (this.value.prop === 'color') {
                    if (self.array2().length === 0) return true;
                    
                    for (const item of self.array2()) {
                        if (item.color === this.value.value) return true;;
                    }
                }

                if (this.value.prop === 'size') {
                    if (self.array1().length === 0) return true;
                    
                    for (const item of self.array1()) {
                        if (item.size === this.value.value) return true;
                    }
                }

                return false;
            }, this);
        };

        self.colorArray = ko.observableArray([
            new self.ArrayConstructor('green', { prop: 'color', value: '15' }),
            new self.ArrayConstructor('red', { prop: 'color', value: '32' }),
            new self.ArrayConstructor('blue', { prop: 'color', value: '33' }),
            new self.ArrayConstructor('black', { prop: 'color', value: '74' }),
            new self.ArrayConstructor('tomato', { prop: 'color', value: '37' }),
            new self.ArrayConstructor('pink', { prop: 'color', value: '38' })
        ]);

        self.sizeArray = ko.observableArray([
            new self.ArrayConstructor('XS', { prop: 'size', value: '3' }),
            new self.ArrayConstructor('SM', { prop: 'size', value: '4' }),
            new self.ArrayConstructor('MD', { prop: 'size', value: '5' }),
            new self.ArrayConstructor('LG', { prop: 'size', value: '6' }),
            new self.ArrayConstructor('XL', { prop: 'size', value: '7' })
        ]);

        self.selectedOptions.subscribe(function (newValue) {
            self.data = params.parent.data;
            const sorted = newValue.sort((prop1, prop2) => prop1['prop'] > prop2['prop'] ? 1 : -1);
            let array1 = [];
            let array2 = [];

            sorted.forEach(item => {
                if (item.prop === 'color') {
                    self.data.forEach(elem => {
                        if (elem.color === item.value) array1.push(elem);
                    });
                }

                if (item.prop === 'size') {
                    self.data.forEach(elem => {
                        if (elem.size === item.value) array2.push(elem);
                    });
                }
            });

            self.array1(array1);
            self.array2(array2);
            self.sorting();
        });

        self.sorting = function () {
            if (self.array1().length === 0 && self.array2().length === 0) {
                self.data = params.parent.data;
                const aaaa = self.data.map(el => el);

                self.data_two(aaaa);
            } else if (self.array1().length !== 0 && self.array2().length === 0) {
                self.data_two(self.array1());
            } else if (self.array1().length === 0 && self.array2().length !== 0) {
                self.data_two(self.array2());
            } else if (self.array1().length !== 0 && self.array2().length !== 0) {
                self.data_two(_.intersection(self.array1(), self.array2()));
            }
        };

        self.test = function () {
        };

        self.data_two.subscribe(function(newValue) {
            console.log(newValue);
        });
    };
});