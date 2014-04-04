define([
    'underscore',
    'backbone',
    // Pull in the Model module from above
    'models/shop'
], function(_, Backbone, ShopModel){
    var ShopCollection = Backbone.Collection.extend({
        model: ShopModel,
        url: "/shops"
    });
    // You don't usually return a collection instantiated
    return ShopCollection;
});