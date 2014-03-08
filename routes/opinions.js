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

		}
	}

}
