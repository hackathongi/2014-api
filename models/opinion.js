/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {
	var Opinion = sequelize.define('Opinion', {
		description	: DataTypes.STRING,
		rating		: { type : DataTypes.INTEGER},
		date		: { type : DataTypes.DATE, validate : {notNull : true }},
		lang		: DataTypes.STRING(3)

	}, {
		classMethods : {
			associate : function(models) {
				Opinion.belongsTo(models.Order)
			}
		}
	});

	return Opinion;
};
