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
				email		: req.body.email
			});
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