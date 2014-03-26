define([
    'underscore',
    'backbone',
    // Pull in the Model module from above
    'models/shop'
], function(_, Backbone, ShopModel){
    var ShopCollection = Backbone.Collection.extend({
        model: ShopModel,
        urlRoot: "/shops"
    });
    // You don't usually return a collection instantiated
    return ShopCollection;
});