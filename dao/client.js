/**
 * New node file
 */

module.exports = function (db) {
    var dao = {};
    var W = require('when');

    dao.getById = function (id, t) {
        var df = W.defer();
        db.Client.find({where: { id: id}, transaction: t}).success(df.resolve).error(df.reject);
        return df.promise;
    }

    dao.getByEmail = function (email, t) {
        var df = W.defer();
        db.Client.find({where: { email: email}, transaction: t}).success(df.resolve).error(df.reject);
        return df.promise;
    }

    dao.createWithShop = function (client, shop, t) {
        var df = W.defer();
        db.Client.create(client, {transaction: t})
            .success(function (client) {
                if (!shop) df.resolve(client);
                else client.addShop(shop, {transaction: t})
                    .success(function () {
                        df.resolve(client);
                    })
                    .error(df.reject)
            }).error(df.reject);
        return df.promise;
    }

    dao.createWithoutShop = function (client, t) {
        var df = W.defer();
        db.Client.create(client, util.addTrans(t, {})).success(df.resolve).error(df.reject)
        return df.promise;
    }


    return dao;
}