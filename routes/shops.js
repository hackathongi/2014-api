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
		},
		get : function(req,res) {
			db.Shop.find(req.body.id).success(function(shop){
				res.setHeader('Content-Type','application-json');
				res.end(JSON.stringify(shop));
			});
		},
		crawled : function(req,res) {
			db.Shop.find({where: {is_client : null}}).success(function(shop){
				res.setHeader('Content-Type','application-json');
				res.end(JSON.stringify(shop));
			});
		},
		send_mail : function(req,res) {
			db.Shop.update(
				{ crawled_mail : Math.round(new Date().getTime()/1000) },
				{ id : req.params.id }
			).success(function(){
				res.send(200, {"OK" : "OK"});
			}).error(function(){
				res.send(500, {error: "Merda!"});
			});
		}
	}

}
