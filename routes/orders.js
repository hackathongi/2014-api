/**
 * New node file
 */


module.exports = function(db) {

	var Q = require('q');
	
	return {
		add : function(req, res) {
			var chainer = new db.Sequelize.Utils.QueryChainer;
			db.Client.findOrCreate({email: req.body.email})
				.success(function(client, created) {
					db.Shop.find({where : {token : req.body.token }})
						.success(function(shop) {
							var order = db.Order.build({
								description: req.body.description,
								token: req.body.token});

							order.save()
								.success(function() {
									order.setClient(client);
									order.setShop(shop);
									client.addOrder(order);
									shop.addOrder(order);
									if (created) {
										client.addShop(shop);
										// shop.addClient(shop);
									}
									res.send(200);
								})
								.error(function(err) {
									res.send(500, {error : err.toString()})
								});
						})
						.error(function(err) {
							res.send(500, {error : err.toString()})	
						});
				})
				.error(function(err) {
					res.send(500, {error : err.toString()})	
				});
			
		},
		get: function(req, res) {
			db.Order.find({where: {id : req.params.id,  include: [ Client, Shop ]}})
				.success(function(order) {
					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify(order));
				});
		}
	}
}
