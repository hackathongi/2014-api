/**
 * New node file
 */

module.exports = function (app) {

    var fs = require('fs');
    var path = require('path');
    var Sequelize = require('sequelize');
    var http = require('http')
    var console = require('console');
    var W = require('when');

    var db = {};

    if ('development' === app.get('env')) {
        var db_credentials = {
            dbname: "apidb",
            username: "apidb",
            password: "apidb"
        }
        var force = true;
    } else {
        var db_credentials = {
            dbname: "apidb",
            username: "apidb",
            password: "apidb"
        }
        var force = false;
    }

    var sequelize = require('sequelize'), sequelize = new Sequelize(
        db_credentials.dbname, db_credentials.username,
        db_credentials.password, {
            dialect: "mysql",
            port: 3306,
            logging: console.log
        });

    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    var df = W.defer();
    db.initPromise = df.promise;


    sequelize.authenticate().complete(function (err) {
        if (!!err) {
            df.reject(err);
        } else {
            console.log('Connection has been established successfully.');
            fs.readdirSync(__dirname).filter(function (file) {
                return (file.indexOf('.') !== 0) && (file !== 'index.js')
            }).forEach(function (file) {
                var model = sequelize.import(path.join(__dirname, file))
                db[model.name] = model;
            });

            Object.keys(db).forEach(function (modelName) {
                if ('associate' in db[modelName]) {
                    db[modelName].associate(db);
                }
            });

            sequelize
                .sync({ force: force })
                .complete(function (err) {
                    if (err) {
                        df.reject(err)
                    } else {
                        df.resolve();

                    }
                })
        }
    });

    return db;
}