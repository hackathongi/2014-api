/**
 * New node file
 */

module.exports = function(db) {

	var dao = {};
	var W = require('when');
    var util = require('../util');


    dao.create = function(data, order, t) {
        var df = W.defer();
        db.Opinion.create(data, util.addTrans(t, {}))
            .success(function(opinion) {
                opinion.setOrder(order, util.addTrans(t, {}))
                    .success(df.resolve)
                    .error(df.reject);
            }).error(df.reject);
        return df.promise;
    }

	return dao;
}