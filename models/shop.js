/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {

	var Shop = sequelize.define('Shop', {
		name : DataTypes.STRING(255),
		adress : DataTypes.STRING(512),
		url : DataTypes.STRING(512),
		phone : DataTypes.STRING(45),
		email : DataTypes.STRING(255),
		logo_url : DataTypes.STRING(1024),
		username : DataTypes.STRING(45),
		password : DataTypes.STRING(45),
		token : DataTypes.STRING(45),
		is_client : DataTypes.BOOLEAN,
		url_scrap : DataTypes.STRING(1024),
		crawled_mail: DataTypes.INTEGER(11)
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