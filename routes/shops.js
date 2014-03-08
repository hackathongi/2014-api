/**
 * New node file
 */


/*
 * GET users listing.
 */

module.exports = function(db) {

	return {
		add : function(req, res) {
			var shop = db.Shop.build(req.body);
			shop.save().complete(function(err) {
				 if (!err) {
					 res.send(200);
				 } else {
					 res.send(500, { error: err.message });
				 }
			})
		},
		get : function(req,res) {
			db.Shop.find(req.body.id).success(function(shop){
				res.setHeader('Content-Type','application-json');
				res.end(JSON.stringify(shop));
			});
		}
	}

}
