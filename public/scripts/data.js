define('data', ['jquery', 'backbone', 'collections/shops'], function($, Backbone, ShopCollection) {
    var Data = {};

    Data.currentShops = new ShopCollection();

    return Data;

});
