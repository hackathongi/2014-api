/**
 * New node file
 */


/*
 * GET users listing.
 */

module.exports = function(db) {

	return {
		add : function(req, res) {
			var shop = db.Shop.build({
				username	: req.body.username,
				mandrill_key	: req.body.mandrill_key 
			})
			shop.save().complete(function(err) {
				 if (!err) {
					 res.send(200);
				 } else {
					 res.send(500, { error: 'something blew up' });
				 }
			})
		}
	}

}
