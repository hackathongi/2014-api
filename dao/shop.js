/**
 * New node file
 */


module.exports = function (db) {
    var dao = {};
    var W = require('when');
    var util = require('../util');

    dao.getById = function (id, t) {
        var df = W.defer();
        db.Shop.find(util.addTrans(t, {where: {id: id}}))
            .success(df.resolve).error(df.reject);
        return df.promise;
    }

    dao.getByEmail = function (email, t) {
        var df = W.defer();
        var options = util.addTrans(t, {where: {email: email}});
        db.Shop.find(options)
            .success(df.resolve).error(df.reject);
        return df.promise;
    }

    dao.getByToken = function (token, t) {
        var df = W.defer();
        db.Shop.find(util.addTrans(t, {where: {token: token}}))
            .success(df.resolve).error(df.reject);
        return df.promise;
    }


    dao.create = function (shop, t) {
        if (!shop.email) throw {message: "Missing 'email' attribute when creating a Shop"};
        var df = W.defer();
        var options = util.addTrans(t, {});
        db.Shop.create(shop, options).success(df.resolve).error(df.reject);
        return df.promise;
    }


    dao.getPage = function (options) {
        var df = W.defer();
        db.Shop.findAll({
            limit: options.limit,
            offset: options.offset,
            order: 'createdAt DESC'})
            .success(df.resolve)
            .error(df.reject);
        return df.promise;
    };

    return dao;
}