/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {
	
	var Shop = sequelize.define('Shop', {
		username 	: DataTypes.STRING,
		mandrill_key	: DataTypes.STRING
	}, {
		classMethods : {	
			associate : function(models) {
				Shop.hasMany(models.Order)
				Shop.hasMany(models.Client)
			}
		
		}
	});
		
	return Shop;
};