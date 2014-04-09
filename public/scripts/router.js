define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            'shops': 'showShops',
            'clients': 'showClients',


            // Default
            '*actions': 'defaultAction'
        }
    });

    var app_router = new AppRouter();

    var initialize = function (Ui) {
        app_router.on('route:showShops', function () {
            Ui.updateShops();
        });
        app_router.on('route:showClients', function () {
            Ui.updateClients();
        });

        app_router.on('defaultAction', function (actions) {
            // We have no matching route, lets just log what the URL was
            console.log('No route:', actions);
        });
        Backbone.history.start();
    };

    return {
        initialize: initialize,
        navigate: function(hash) {
            app_router.navigate(hash, {trigger: true})
        }
    };
});