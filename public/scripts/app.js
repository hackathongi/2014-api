define('app', ['jquery', 'backbone', 'router'], function($, Bb, Router) {
    var App = {};

    App.initialize = function() {
        Router.initialize();
    }

    return App;
});
