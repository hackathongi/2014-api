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
			//console.log("Parametres: " + req.params);
			//console.log("Parms+shop: " + req.params.rating);
			//console.log("Req: " + req);
			console.log(req.body);
			var auxLength=req.body.length;
			console.log(auxLength);
			for(var aux=0;aux<auxLength;aux++) {
				console.log(req.body[aux]);
			}
			
			//var foo=JSON.parse(req);
			//console.log("Foo: " + foo);
			//console.log("Body+rating: "+req.body.rating);
			//console.log("Body+shop_name: "+req.body.shop_name);
			
			var shop = db.Shop.build({
				name: "aixo es un nom",//req.params.SHOP_NAME,
				adress: req.params.SHOP_ADDRESS,
				url: req.params.SHOP_URL,
				phone : req.params.SHOP_PHONE,
				email : req.params.SHOP_EMAIL,
				logo_url : req.params.SHOP_LOGO,
				is_client : false,
				url_scrap : req.params.SHOP_URL_COMPETITOR
				
			});
			var order = db.Order.build({
				description: "CRAWLER",
				pending: 0
			});
			var opinion = db.Opinion.build({
				description: req.params.DESCRIPTION,
		        rating: req.params.RATING,
		        date: req.params.DATE,
		        lang: req.params.LANGUAGE				
			});
			
			
			shop.save().complete(function(err){
				if(!err){
					order.save().complete(function(err){
						if(!err){
							opinion.save().complete(function(err){
								if(!err){
									res.send(200);
								}else{
									res.send(500, { error: 'Error al guardar Opinion' });
								}
							});
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