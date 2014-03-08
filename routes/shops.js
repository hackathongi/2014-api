/**
 * New node file
 */


/*
 * GET users listing.
 */

module.exports = function(db) {

	var uuid = require('node-uuid');
	
	return {
		add : function(req, res) {
			var shop = db.Shop.build(req.body);
			shop.save().complete(function(err) {
				 if (!err) {
					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify({token: uuid.v4()}));
				 } else {
					 res.send(500, { error: err.message });
				 }
			})
		}
	}

}
