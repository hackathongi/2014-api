/**
 * New node file
 */


module.exports = function(db) {

	var Q = require('q');
	
	return {
		add : function(req, res) {
			db.Client.find({where: {id: req.params.client_id}})
				.success(function(client) {
					var order = db.Order.build({
						description: req.body.description,
						token: req.body.token});
					order.setClient(client);
					client.addOrder(order);
					res.send(200);
				})
				.error(function(err) {
					res.send(500, {error: err.toString()})
				})
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
