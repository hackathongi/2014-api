define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var ShopModel = Backbone.Model.extend({
        urlRoot: "/shops"
    });
    // Return the model for the module
    return ShopModel;
});