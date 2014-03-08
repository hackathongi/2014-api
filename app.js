var express = require('express')
  , http    = require('http')
  , path    = require('path')
var cors = require('cors');

 
var app = express()

app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(cors());
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))
 
var db = require('./models')(app)