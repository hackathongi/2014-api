/**
 * New node file
 */


/*
 * GET users listing.
 */

module.exports = function(db) {

    var util = require('../util');
    var dao = require('../dao')(db);

	return {
		create : function(req, res) {
            if (!req.body.email) {
                util.stdErr400(res, "Missing 'email' attribute");
                return;
            }

            if (req.body.token) {
                db.sequelize.transaction(function (t) {
                    dao.Shop.getByToken(req.body.token)
                        .then(function(shop) {
                            if (!shop) util.reject("Cannot find Shop with 'token' = " + req.body.token)
                            else return dao.Client.createWithShop(req.body, shop, t);
                        })
                        .then(util.commit.genFuncLeft(t), util.rollback.genFuncLeft(t))
                        .then(util.stdSeqSuccess.genFuncLeft(res, {}), util.stdErr500.genFuncLeft(res))
                        .done();
                });
            } else {
                dao.Client.createWithoutShop(req.body)
                    .then(util.stdSeqSuccess.genFuncLeft(res, {}), util.stdErr500.genFuncLeft(res))
                    .done();
            }
		},
		getById : function(req,res) {
			db.Client.find(req.params.id).success(function(client){
				res.setHeader('Content-Type','text-json');
				res.end(JSON.stringify(client));
			});
		}
	}

}
