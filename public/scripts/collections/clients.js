define([
    'backbone',
    // Pull in the Model module from above
    'models/client'
], function(Backbone, ClientModel){
    var ClientCollection = Backbone.Collection.extend({
        model: ClientModel,
        url: "/clients"
    });
    // You don't usually return a collection instantiated
    return ClientCollection;
});