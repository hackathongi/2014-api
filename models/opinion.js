/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {	
	var Opinion = sequelize.define('Opinion', {
		description	: DataTypes.STRING,
		rating		: DataTypes.INTEGER,
		date		: DataTypes.DATE,
		order_id	: DataTypes.TINYINT,
		lang		: DataTypes.STRING(3),
		
	}, {
		classMethods : {
			associate : function(models) {
				Opinion.belongsTo(models.Order)
			}
		}
	});
	
	return Opinion;
};