define([], () => {
    'use strict';
    
    return function HeaderViewModel() {
        const self = this;

        self.toggleMenu = () => {
            document.querySelector('.header__nav-list').classList.toggle('header__nav-list--active');
        };
    };
});