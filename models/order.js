/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {	
	var Order = sequelize.define('Order', {
		description : DataTypes.STRING(1024),
		date : DataTypes.DATE,
		token : DataTypes.STRING(45),
		pending: DataTypes.INTEGER
	}, {
		classMethods : {
			associate : function(models) {
				Order.hasOne(models.Opinion)
				Order.hasOne(models.Client)
				Order.belongsTo(models.Shop)
			}
		}
	});
	
	return Order;
};