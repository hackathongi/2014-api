/*
 * GET users listing.
 */

module.exports = function(db) {

	return {
		list : function(req, res) {
			db.Order.findAndCountAll({
						include : [ db.Opinion],
						where : { token : req.query.token}, 
						limit: req.query.limit,
						offset: req.query.offset,
						order : 'createdAt DESC'})
				.success(function(orders) {
					var results = [];
					for (var i = 0; i < orders.length; i++) {
						var op = orders[i].getOpinion();
						if (op) {
							results.push(op);
						}
						results.num_pages = Math.ceil(orders.count / req.query.limit);
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
			db.Order.find({where : { id : req.params.order_id}})
				.success(function(order) {
					var opinion = db.Opinion.build({
						description	: req.params.description,
						rating		: req.params.rating,
						date		: req.params.date,				
					});
					opinion.save()
						.success(function() {
							opinion.setOrder(order);
							res.setHeader('Content-Type', 'application/json');
							res.send(200,{result: 'OK'})
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
