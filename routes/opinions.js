/*
 * GET users listing.
 */

module.exports = function(db) {

	return {
		list : function(req, res) {
			db.Opinion.findAll({
			// include : [ db.Task ]
			}).success(function(opinions) {
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(opinions));
			})

		},
		// Revisar que els camps del form es diguin igual que els de la funció
		add : function(req,res) {
			var opinion = db.Opinion.build({
					description	: descripcio,
					rating		: valoracio,
					date		: data,
					order_id	: order_id
				
			})
			opinion.save().complete(function(err) {
				if(!err) res.send(200)
				else res.send(500, { error : 'the opinion could not be added' });
			})
					
		}
	}

}
