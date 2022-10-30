// eslint-disable-next-line no-undef
requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'libs/jquery',
        ko: 'libs/knockout-latest',
        text: 'libs/text',
        underscore: 'libs/underscore'
    }
});

require(['init']);