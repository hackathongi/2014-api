/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {	
	var Client = sequelize.define('Client', {
		name : DataTypes.STRING(255),
		surname : DataTypes.STRING(255),
		address : DataTypes.STRING(512),
		city : DataTypes.STRING(255),
		post_code : DataTypes.STRING(10),
		country : DataTypes.STRING(255),
		born_date : DataTypes.DATE,
		sex : DataTypes.STRING(1),
		email : DataTypes.STRING(255),
		phone : DataTypes.STRING(45),
		html_signature : DataTypes.STRING(255),
		clientcol : DataTypes.STRING(45)   // WTF?
	}, {
		classMethods : {
			associate : function(models) {
				Client.hasMany(models.Shop)
				Client.hasMany(models.Order)
			}
		}
	});
	
	return Client;
};