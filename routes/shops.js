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
				name 		: req.body.name,
				token 		: req.body.token,
				address		: req.body.address,
				url		: req.body.url,
				phone		: req.body.phone,
				email		: req.body.email,
				logo_url	: req.body.logo_url,
				password	: req.body.password,
				is_client	: req.body.is_client,
				url_scrap	: req.body.url_scrap
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
