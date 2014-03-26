/*
 * GET users listing.
 */

module.exports = function(db) {

	var util = require('../util');
	var dao = require('../dao')(db);

	return {
		getById : function(req, res) {
            dao.Shop.getById(req.params.id)
				.then(function(shop) {
					if (!shop) util.reject("Cannot find shop with id = " + req.params.id);
					return dao.Opinion.getFromShop(shop, {
						page: req.query.page || 0,
						limit: req.query.size || 10,
						rating: req.query.rating || 0,
						include : [ db.Order ],
						offset : page * size,
						order : 'createdAt DESC'});
				})
                .then(util.stdSeqSuccess.genFuncLeft(res), util.stdSeqError.genFuncLeft(res))
                .done();
		},

        getByToken : function(req, res) {
            if (!req.query.token) {
                util.stdErr400(res, "Missing 'token' parameter in URL");
                return;
            }

            dao.Shop.getByToken(req.query.token)
                .then(function(shop) {
                    if (!shop) util.reject("Cannot find shop with token = " + req.query.token);
                    else {
                        var page = req.query.page || 0;
                        var limit = req.query.size || 10;
                        var offset = page * limit;
                        return dao.Order.getFromShop(shop, {
                            limit: limit,
                            rating: req.query.rating || 0,
                            include : [ db.Opinion ],
                            offset : offset,
                            order : 'createdAt DESC'});
                    }
                })
                .then(util.stdSeqSuccess.genFuncLeft(res), util.stdSeqError.genFuncLeft(res))
                .done();
        },

		create : function(req,res) {
            if (!req.body.order_id) {
                util.stdErr400(res, "Missing 'order_id' attribute in body");
                return;
            }

            db.sequelize.transaction(function (t) {
                dao.Order.getById(req.body.order_id, t)
                    .then(function(order) {
                        if (!order) util.reject("No Order with attribute 'id' = " + req.body.order_id);
                        else return dao.Opinion.create(req.body, order, t);
                    })
                    .then(util.commit.genFuncLeft(t), util.rollback.genFuncLeft(t))
                    .then(util.stdSeqSuccess.genFuncLeft(res), util.stdErr500.genFuncLeft(res))
                    .done();
            });
		}
	}
}
