/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {	
	var Opinion = sequelize.define('Opinion', {
		id: DataTypes.BIGINT,
		username : DataTypes.STRING
	}, {
		classMethods : {
			associate : function(models) {
				Opinion.belongsTo(models.Order)
			}
		}
	});
	
	return Opinion;
};