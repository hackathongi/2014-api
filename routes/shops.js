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
			var token= uuid.v4()
			var attrs= {email: req.body.username, token: token}
			var shop = db.Shop.build(attrs);
			shop.save().complete(function(err) {
				 if (!err) {
					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify({token: token}));
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
