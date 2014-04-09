define([
    'jquery',
    'underscore',
    'backbone',
    'collections/clients',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!/templates/client/list.html'
], function($, _, Backbone, ClientCollection, clientListTemplate) {
    var ProjectListView = Backbone.View.extend(function() {

        var clients = new ClientCollection();

        return {

            initialize: function (params) {
                var that = this;
                clients.on('reset', function () {
                    that.render(clients)
                })
            },

            render: function () {
                // Using Underscore we can compile our template with data
                var compiledTemplate = _.template(clientListTemplate, {items: clients});
                // Append our compiled template to this Views "el"
                this.$el.empty().append(compiledTemplate);
            },

            update: function (options) {
                var op = options || {reset: true}
                clients.fetch(op);
                this.render();
            }
        }
    }());

    // Our module now returns our view
    return ProjectListView;
});