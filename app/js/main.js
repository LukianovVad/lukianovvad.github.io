define([
    'ko',
    'text!components/header/header.html',
    'text!components/main/main.html',
    'text!components/sidebar/sidebar.html',
    'text!components/toolbar/toolbar.html',
    'text!components/products/products.html',
    'text!components/pagination/pagination.html',
    'text!components/footer/footer.html',
    'components/main/Main',
    'components/sidebar/Sidebar',
    'components/toolbar/Toolbar',
    'components/products/Products',
    'components/pagination/Pagination'
], function (
    ko,
    headerTemplate,
    mainTemplate,
    sidebarTemplate,
    toolbarTemplate,
    productsTemplate,
    paginationTemplate,
    footerTemplate,
    viewModelMain,
    viewModelSidebar,
    viewModelToolbar,
    viewModelProducts,
    viewModelPagination) {
    'use strict';

    ko.components.register('header', {
        template: headerTemplate
    });

    ko.components.register('main', {
        viewModel: viewModelMain,
        template: mainTemplate
    });

    ko.components.register('sidebar', {
        viewModel: viewModelSidebar,
        template: sidebarTemplate
    });

    ko.components.register('toolbar', {
        viewModel: viewModelToolbar,
        template: toolbarTemplate
    });

    ko.components.register('products', {
        viewModel: viewModelProducts,
        template: productsTemplate
    });

    ko.components.register('pagination', {
        viewModel: viewModelPagination,
        template: paginationTemplate
    });

    ko.components.register('footer', {
        template: footerTemplate
    });

    ko.applyBindings();
});