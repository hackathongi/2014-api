/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {	
	var Order = sequelize.define('Order', {
		description : DataTypes.STRING(1024),
		date : DataTypes.DATE,
		token : DataTypes.STRING(45),
	}, {
		classMethods : {
			associate : function(models) {
				Order.hasOne(models.Opinion)
			}
		}
	});
	
	return Order;
};