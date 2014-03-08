var express = require('express')
  , http    = require('http')
  , path    = require('path')
 
var app = express()

var db = require('./models')(app)

var routes  = require('./routes')


// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))
 
// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler())
}
 
app.get('/', routes.index)

//app.post('/users/create', user.create)
//app.post('/users/:user_id/tasks/create', task.create)
//app.get('/users/:user_id/tasks/:task_id/destroy', task.destroy)