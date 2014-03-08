/**
 * New node file
 */


module.exports = function(db) {

	var Q = require('q');
	
	return {
		add : function(req, res) {
			db.Client.find(req.params.user_id)
				.then(function(cl) {
					var order = db.Order.build({
						description: req.body.description,
						token: req.body.token});
					return order.setClient(cl)
						.then(function(or) {
							return cl.addOrder(or)
						.then(function() {
							res.send(200);
						});});},
						function (err) {
							 res.send(500, { error: 'something blew up' });
						}
						
						})		
				})
				});
			
			shop.save().then(function(err) {
				 if (!err) {
					 res.send(200);
				 } else {
					 res.send(500, { error: 'something blew up' });
				 }
			});
		}
	}

}
