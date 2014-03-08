/*
 * GET users listing.
 */

module.exports = function(db) {

	return {
		list : function(req, res) {
			db.Order.findAll({
						include : [ db.Opinion],
						where : { token : req.query.token}, 
						limit: 10, 
						order : 'createdAt DESC'})
				.success(function(orders) {
					var results = [];
					for (var i = 0; i < orders.length; i++) {
						var op = orders[i].getOpinion();
						if (op) {
							results.push(op);
						}
						res.setHeader('Content-Type', 'application/json');
						res.end(JSON.stringify(results));
					}		
				})
				.error(function(err) {
					res.send(500, { error : err.messsage });
				});
		},

		// Revisar que els camps del form es diguin igual que els de la funció
		add : function(req,res) {
			db.Order.find({where : { id : req.body.order_id}})
				.success(function(order) {
					var opinion = db.Opinion.build({
						description	: req.body.description,
						rating		: req.body.rating,
						date		: req.body.date,				
					});
					opinion.save()
						.success(function() {
							opinion.setOrder(order);
							res.send(200)
						})
						.error(function(err) {
							res.send(500, { error : err.message });					
						});
				})
				.error(function(err) {
					res.send(500, { error : err.message });					
				});				
		}
	}

}
