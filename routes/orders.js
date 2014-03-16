/**
 * New node file
 */


module.exports = function (db) {

    var async = require('async');
    var util = require('../util');
    var dao = require('../dao')(db);
    var W = require('when');

    return {
        create: function (req, res) {
            if (!req.body.token) res.send(400, {error: "No token parameter in request"})
            if (!req.body.order) res.send(400, {error: "No order parameter in request"})
            if (!req.body.client.email) res.send(400, {error: "No client parameter in request"})

            db.sequelize.transaction(function (t) {
                W.all([dao.Client.getByEmail(req.body.client.email, t),
                        dao.Shop.getByToken(req.body.token, t)])
                    .spread(function (client, shop) {
                        if (!shop) util.reject("No shop exists with token = " + token);
                        if (client) return W.all([client, shop]);
                        return W.all([dao.Client.createWithShop(req.body.client, shop, t), shop]);
                    })
                    .spread(function (client, shop) {
                        return dao.Order.create(req.body.order, client, shop, t);
                    })
                    .then(util.commit.genFuncLeft(t), util.rollback.genFuncLeft(t))
                    .then(util.stdSeqSuccess.genFuncLeft(res), util.stdErr500.genFuncLeft(res))
                    .done();
            });
        },

        getById: function (req, res) {
            if (!req.params.id) util.stdErr500(res, "Missing parameter 'id'");
            else
                db.Order.find({where: {id: req.params.id, include: [ Client, Shop ]}})
                    .success(util.stdSeqSuccess.genFuncLeft(res), util.stdSeqError.genFuncLeft(res))
                    .done();
        }
    }
}
