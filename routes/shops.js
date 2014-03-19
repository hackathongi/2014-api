/**
 * New node file
 */


/*
 * GET users listing.
 */

module.exports = function (db) {

    var uuid = require('node-uuid');
    var util = require('../util');
    var dao = require('../dao')(db);

    return {
        create: function (req, res) {
            if (!req.body.email) {
                util.stdErr500("Missing 'email' attribute in body");
                return;
            }

            req.body.token = 'b0ba0d32-13a6-470e-97a5-9d603a3d5d5c'; // uuid.v4();

            dao.Shop.getByEmail(req.body.email)
                .then(function (shop) {
                    if (shop) throw {message: "Already exist a shop with email = " + req.body.email};
                    return dao.Shop.create(req.body);
                })
                .then(util.stdSeqSuccess.genFuncLeft(res, {token: req.body.token}),
                    util.stdSeqError.genFuncLeft(res))
                .done();
        },
        getById: function (req, res) {
            if (!req.params.id) {
                util.stdErr500("Missing 'email' parameter");
                return;
            }

            dao.Shop.getById(req.params.id)
                .then(function (shop) {
                    if (!shop) util.reject("No Shop with 'id' = " + req.params.id);
                    else return shop;
                })
                .then(util.stdSeqSuccess.genFuncLeft(res), util.stdSeqError.genFuncLeft(res))
                .done();
        },
        getPage: function (req, res) {
            var page = req.query.page || 0;
            var limit = req.query.size || 10;
            var offset = page * limit;
            dao.Shop.getPage({ limit: limit, offset: offset})
                .then(util.stdSeqSuccess.genFuncLeft(res), util.stdSeqError.genFuncLeft(res))
                .done();
        },

        crawled: function (req, res) {
            db.Shop.find({where: {is_client: null}}).success(function (shop) {
                res.setHeader('Content-Type', 'application-json');
                res.end(JSON.stringify(shop));
            });
        },
        send_mail: function (req, res) {
            db.Shop.update(
                { crawled_mail: Math.round(new Date().getTime() / 1000) },
                { id: req.params.id }
            ).success(function () {
                    res.send(200, {"OK": "OK"});
                }).error(function () {
                    res.send(500, {error: "Merda!"});
                });
        }
    }

}
