define([
    'jquery',
    'underscore',
    'backbone',
    'collections/shops',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!/templates/shop/list.html'
], function($, _, Backbone, ShopCollection, shopListTemplate) {
    var ProjectListView = Backbone.View.extend(function() {

        var shops = new ShopCollection();

        return {

            initialize: function (params) {
                var that = this;
                shops.on('reset', function () {
                    that.render(shops)
                })
            },

            render: function () {
                // Using Underscore we can compile our template with data
                var compiledTemplate = _.template(shopListTemplate, {items: shops});
                // Append our compiled template to this Views "el"
                this.$el.empty().append(compiledTemplate);
            },

            update: function (options) {
                var op = options || {reset: true}
                shops.fetch(op);
                this.render();
            }
        }
    }());

    // Our module now returns our view
    return ProjectListView;
});