define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var ClientModel = Backbone.Model.extend({
        urlRoot: "/clients"
    });
    // Return the model for the module
    return ClientModel;
});