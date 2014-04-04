define('ui', ['jquery', 'backbone', 'data', 'views/shops/list'], function($, Backbone, Data, ShopsView) {
    var Ui = {};

    var shopsView = new ShopsView({el: '#shop_view', collection: Data.currentShops});

    Ui.initialize = function() {

    };

    Ui.showShops = function() {
        shopsView.render()
    };

    Ui.updateShops = function() {
        shopsView.update()
    };



    return Ui;

});
