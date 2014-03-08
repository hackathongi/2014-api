/**
 * New node file
 */

module.exports = function(app) {

	var fs = require('fs');
	var path = require('path');
	var Sequelize = require('sequelize');
	var lodash = require('lodash');
	var http = require('http')

	var sequelize = new Sequelize('sequelize_test', 'root', null);
	var db = {};

	if ('development' === app.get('env')) {
		var db_credentials = {
			dbname : "apidb",
			username : "apidb",
			password : "apidb"
		}
	} else {
		var db_credentials = {
			dbname : "apidb",
			username : "apidb",
			password : "apidb"
		}
	}

	var sequelize = require('sequelize'), sequelize = new Sequelize(
			db_credentials.dbname, db_credentials.username,
			db_credentials.password, {
				dialect : "mysql",
				port : 3306,
			});

	sequelize.authenticate().complete(function(err) {
		if (!!err) {
			console.log('Unable to connect to the database:', err);
		} else {
			console.log('Connection has been established successfully.');
			fs.readdirSync(__dirname).filter(function(file) {
				return (file.indexOf('.') !== 0) && (file !== 'index.js')
			}).forEach(function(file) {
				var model = sequelize.import(path.join(__dirname, file))
				db[model.name] = model;
			});

			Object.keys(db).forEach(function(modelName) {
				if ('associate' in db[modelName]) {
					db[modelName].associate(db);
				}
			});
			
			
			var opinions = require('../routes/opinions')(db)
			app.get('/opinions', opinions.list)
			var shops = require('../routes/shops')(db)
			app.post('/shops', shops.add)

			
			sequelize
			  .sync({ force: true })
			  .complete(function(err) {
			    if (err) {
			      throw err
			    } else {
			    	
			      http.createServer(app).listen(app.get('port'), function(){
			        console.log('Express server listening on port ' + app.get('port'))
			      })
			    }
			  })
		}
	});


	return lodash.extend({
		sequelize : sequelize,
		Sequelize : Sequelize
	}, db);
}