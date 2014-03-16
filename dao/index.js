/**
 * New node file
 */

module.exports = function(db) {
	var dao = {};
	var W = require('when');

	dao.Shop = require('./shop')(db);
	dao.Opinion = require('./opinion')(db);
    dao.Client = require('./client')(db);
    dao.Order = require('./order')(db);

    dao.create = function(Model, data) {
		var df = W.defer();
		Model.create(data).success(df.resolve).error(df.reject);
		return df.promise;
	}

	return dao;
}