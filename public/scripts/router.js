define([
    'jquery',
    'underscore',
    'backbone',
    'views/shops/list'
], function ($, _, Backbone, ShopListView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            '/projects': 'showProjects',
            '/users': 'showUsers',

            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function () {
        var app_router = new AppRouter;
        app_router.on('showShops', function () {
            // Call render on the module we loaded in via the dependency array
            // 'views/projects/list'
            var shopListView = new ShopListView();
            shopListView.render();
        });
        app_router.on('defaultAction', function (actions) {
            // We have no matching route, lets just log what the URL was
            console.log('No route:', actions);
        });
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});