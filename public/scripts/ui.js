define('ui',
    [
        'jquery',
        'backbone',
        'data',
        'views/shops/list',
        'views/clients/list'
    ], function($, Backbone, Data, ShopsView, ClientsView) {
    var Ui = {};

    var shopsView = new ShopsView({el: '#shop_view'});
    var clientsView = new ClientsView({el: '#client_view'});

    Ui.initialize = function() {

    };

    Ui.showShops = function() {
        shopsView.render()
    };

    Ui.updateShops = function() {
        clientsView.$el.hide()
        shopsView.update()
        shopsView.$el.show()
    };

    Ui.updateClients = function() {
        shopsView.$el.hide()
        clientsView.update()
        clientsView.$el.show()
    };




    return Ui;

});
