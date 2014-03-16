/**
 * New node file
 */

module.exports = function (db) {
    var dao = {};
    var W = require('when');
    var util = require('../util');

    dao.getById = function(id, t) {
        var df = W.defer();
        db.Order.find({where: {id: id}, transaction: t}).success(df.resolve).error(df.reject);
        return df.promise;
    }

    dao.getFromShop = function(shop, options, t) {
        options = util.addTrans(t, options);
        var df = W.defer();
        shop.getOrders(options).success(df.resolve).error(df.reject);
        return df.promise;
    }


    dao.create = function (order_data, client, shop, t) {
        var df = W.defer();
        db.Order.create(order_data, util.addTrans(t, {}))
            .success(function (order) {
                order.setShop(shop, util.addTrans(t, {}))
                    .success(function() {
                        order.setClient(client, util.addTrans(t, {}))
                            .success(function () {
                                df.resolve(order)
                            })
                            .error(df.reject);
                    })
                    .error(df.reject)
            })
            .error(df.reject);
        return df.promise;
    }

    return dao;
}