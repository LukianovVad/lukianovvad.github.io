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
        self.filteredProducts = ko.observable();
        self.testArray = ko.observable();
        self.state = ko.observable(null);
        self.filters = ko.observableArray([
            {
                label: 'Color',
                options: [
                    {
                        count: ko.computed(() => {
                            if (self.state() === 'color') {
                                self.json = params.parent.json;
                                return self.json.filter((item) => item.color === '15').length;
                            }
                            return self.products().filter((item) => item.color === '15').length;

                        }),
                        isSelected: ko.observable(false),
                        key: 'color',
                        name: 'green',
                        value: '15'
                    },
                    {
                        count: ko.computed(() => {
                            if (self.state() === 'color') {
                                self.json = params.parent.json;
                                return self.json.filter((item) => item.color === '33').length;
                            }
                            return self.products().filter((item) => item.color === '33').length;
                        }),
                        isSelected: ko.observable(false),
                        key: 'color',
                        name: 'red',
                        value: '33'
                    },
                    {
                        count: ko.computed(() => {
                            if (self.state() === 'color') {
                                self.json = params.parent.json;
                                return self.json.filter((item) => item.color === '32').length;
                            }
                            return self.products().filter((item) => item.color === '32').length;
                        }),
                        isSelected: ko.observable(false),
                        key: 'color',
                        name: 'black',
                        value: '32'
                    },
                    {
                        count: ko.computed(() => {
                            if (self.state() === 'color') {
                                self.json = params.parent.json;
                                return self.json.filter((item) => item.color === '74').length;
                            }
                            return self.products().filter((item) => item.color === '74').length;
                        }),
                        isSelected: ko.observable(false),
                        key: 'color',
                        name: 'tomato',
                        value: '74'
                    },
                    {
                        count: ko.computed(() => {
                            if (self.state() === 'color') {
                                self.json = params.parent.json;
                                return self.json.filter((item) => item.color === '37').length;
                            }
                            return self.products().filter((item) => item.color === '37').length;
                        }),
                        isSelected: ko.observable(false),
                        key: 'color',
                        name: 'gray',
                        value: '37'
                    },
                    {
                        count: ko.computed(() => {
                            if (self.state() === 'color') {
                                self.json = params.parent.json;
                                return self.json.filter((item) => item.color === '38').length;
                            }
                            return self.products().filter((item) => item.color === '38').length;
                        }),
                        isSelected: ko.observable(false),
                        key: 'color',
                        name: 'pink',
                        value: '38'
                    }
                ]
            },
            {
                label: 'Size',
                options: [
                    {
                        count: ko.computed(() => {
                            if (self.state() === 'size') {
                                self.json = params.parent.json;
                                return self.json.filter((item) => item.size === '3').length;
                            }
                            return self.products().filter((item) => item.size === '3').length;
                        }),
                        isSelected: ko.observable(false),
                        key: 'size',
                        name: 'XS',
                        value: '3'
                    },
                    {
                        count: ko.computed(() => {
                            if (self.state() === 'size') {
                                self.json = params.parent.json;
                                return self.json.filter((item) => item.size === '4').length;
                            }
                            return self.products().filter((item) => item.size === '4').length;
                        }),
                        isSelected: ko.observable(false),
                        key: 'size',
                        name: 'Xl',
                        value: '4'
                    },
                    {
                        count: ko.computed(() => {
                            if (self.state() === 'size') {
                                self.json = params.parent.json;
                                return self.json.filter((item) => item.size === '5').length;
                            }
                            return self.products().filter((item) => item.size === '5').length;
                        }),
                        isSelected: ko.observable(false),
                        key: 'size',
                        name: 'XXl',
                        value: '5'
                    },
                    {
                        count: ko.computed(() => {
                            if (self.state() === 'size') {
                                self.json = params.parent.json;
                                return self.json.filter((item) => item.size === '6').length;
                            }
                            return self.products().filter((item) => item.size === '6').length;
                        }),
                        isSelected: ko.observable(false),
                        key: 'size',
                        name: 'XXS',
                        value: '6'
                    },
                    {
                        count: ko.computed(() => {
                            if (self.state() === 'size') {
                                self.json = params.parent.json;
                                return self.json.filter((item) => item.size === '7').length;
                            }
                            return self.products().filter((item) => item.size === '7').length;
                        }),
                        isSelected: ko.observable(false),
                        key: 'size',
                        name: 'XXM',
                        value: '7'
                    }
                ]
            }
        ]);

        self.eventHendler = (event) => {
            self.setSelectedState(event);
            self.filtering();
            self.setFilterState();
            self.removFilterWithoutProducts();
        };

        self.setSelectedState = (checkBox) => {
            checkBox.isSelected() ? checkBox.isSelected(false) : checkBox.isSelected(true);
        };

        self.setFilterState = () => {
            let state = null;

            self.filters().forEach(item => {
                item.options.forEach(element => {
                    if (element.isSelected() && self.testArray().length === 1) {
                        state = element['key'];
                    }
                });
            });

            self.state(state);
        };

        self.filtering = () => {
            const array = [];
            const json = params.parent.json;
            const obj = {};

            self.filters().forEach(item => {
                const label = item['label'].toLowerCase();

                obj[label] = [];
                item.options.forEach(element => {
                    obj[label].push(json
                        .filter(productItems => element.isSelected() && productItems[label] === element.value));
                });
                obj[label] = obj[label].flat(Infinity);
            });

            Object.keys(obj).forEach(element => {
                if (obj[element].length) {
                    array.push(obj[element]);
                }
            });

            if (!array.length) {
                self.json = params.parent.json;
                self.products(self.json);
            } else if (array.length === 1) {
                self.products(array[0]);
            } else {
                self.products(_.intersection(array[0], array[1]));
            }

            self.testArray(array);
        };

        self.removFilterWithoutProducts = () => {
            self.filters().forEach(item => {
                item.options.forEach(element => {
                    if (element.isSelected() && element.count() === 0) {
                        element.isSelected(false);
                        self.filtering();
                        return;
                    }
                });
            });
        };
    };
});