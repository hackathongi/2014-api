/**
 * New node file
 */


/*
 * GET users listing.
 */

module.exports = function(db) {

	return {
		add : function(req, res) {
			var client = db.Client.build({
				name		: req.body.name,
				surname		: req.body.surname,
				address 	: req.body.address,
				city		: req.body.city,
				post_code	: req.body.post_code,
				country		: req.body.country,
				born_date	: req.body.born_date,
				sex		: req.body.sex,
				email		: req.body.email,
				phone		: req.body.phone,
			})
			client.save().complete(function(err) {
				 if (!err) {
					 res.send(200);
				 } else {
					 res.send(500, { error: 'something blew up' });
				 }
			})
		}
	}

}
