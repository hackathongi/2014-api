/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {	
	var Order = sequelize.define('Order', {
		id: DataTypes.BIGINT,
		username : DataTypes.STRING
	}, {
		classMethods : {
			associate : function(models) {
				Order.hasOne(models.Opinion)
			}
		}
	});
	
	return Order;
};