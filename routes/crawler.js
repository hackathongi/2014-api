/**
 * New node file
 */


/*
 * GET users listing.
 */

module.exports = function(db) {

	return {
		add : function(req, res) {
			console.log("estem dins add");
			/*var client = db.Client.build({
				name		: req.body.USER_NAME,
				surname		: req.body.USER_SURNAME,
				email		: req.body.USER_EMAIL
			});*/

			var shop = db.Shop.build({
				name: req.body.shop.shop_name,
				adress: req.body.shop.shop_address,
				url: req.body.shop.shop_url,
				phone : req.body.shop.shop_phone,
				email : req.body.shop.shop_email,
				logo_url : req.body.shop.shop_logo,
				is_client : false,
				url_scrap : req.body.shop.shop_url_competitor
				
			});

			
			var order = db.Order.build({
				description: "CRAWLER",
				pending: 0
			});
			
			
			//S'hauria de comprovar que la Shop no existeix
			shop.save().complete(function(err){
				if(!err){
					order.save().complete(function(err){
						if(!err){
							var reviews = req.body.reviews.length;
							for(var i = 0; i<reviews;i++){
								var review = req.body.reviews[i];
								var opinion = db.Opinion.build({
									description: review.description,
							        rating: review.rating,
							        date: review.date,
							        lang: review.lang				
								});
								opinion.save().complete(function(err){
									if(!err){
										//res.send(200);
									}else{
										res.send(500, { error: 'Error al guardar Opinion' });
									}
								});
							}
							res.send(200);
						}else{
							res.send(500, { error: 'Error al guardar Order' });
						}
					});
						
				}else{
					res.send(500, { error: 'Error al guardar Shop' });
				}
			});
			/*client.save().complete(function(err) {
				 if (!err) {
					 res.send(200);
				 } else {
					 res.send(500, { error: 'something blew up' });
				 }
			})*/
		}
	}

}