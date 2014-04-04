define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!/templates/shop/item.html'
], function($, _, Backbone, shopItem){
    var ShopItem = Backbone.View.extend({

        template: _.template(shopItem),

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'visible', this.toggleVisible);
        },

        render: function() {
            if (this.model.changed.id !== undefined) {
                return;
            }

            this.$el.html(this.template(this.model.toJSON()));
            // this.$el.toggleClass('completed', this.model.get('completed'));
            // this.toggleVisible();
            // this.$input = this.$('.edit');
            return this;
        }
    });
    // Our module now returns our view
    return ShopItem;
});