/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {	
	var Client = sequelize.define('Client', {
		id: DataTypes.BIGINT,
	}, {
		classMethods : {
			associate : function(models) {
				Client.hasMany(models.Shop)
			}
		}
	});
	
	return Client;
};