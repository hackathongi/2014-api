var express = require('express')
    , http = require('http')
    , path = require('path')
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

Function.prototype.genFuncLeft = function () {
    var fn = this, args = Array.prototype.slice.call(arguments);
    return function () {
        return fn.apply(null, args.concat(Array.prototype.slice.call(arguments)));
    }
}

Function.prototype.genFuncRight = function () {
    var fn = this, args = Array.prototype.slice.call(arguments);
    return function () {
        return fn.apply(null, Array.prototype.slice.call(arguments).concat(args));
    }
}

var db = require('./models')(app);

db.initPromise
    .then(function () {
        var opinions = require('./routes/opinions')(db)
        var shops = require('./routes/shops')(db)
        var orders = require('./routes/orders')(db)
        var clients = require('./routes/clients')(db)

        app.post('/opinions', opinions.create);
        app.get('/opinions', opinions.getByToken)

        // app.get('/orders/pending',orders.pending)
        app.get('/orders/:id', orders.getById)
        app.post('/orders', orders.create)

        //app.post('/shops/crawled/:id', shops.send_mail);
        // app.get('/shops/crawled', shops.crawled)
        app.get('/shops/:id', shops.getById)
        app.get('/shops', shops.getPage)
        app.post('/shops', shops.create)
        app.get('/shops/:id/opinions', opinions.getById)

        app.post('/clients', clients.create)
        app.get('/clients/:id', clients.getById)

        var port = process.env.OPENSHIFT_NODEJS_PORT || app.get('port');
        var ip = process.env.OPENSHIFT_INTERNAL_IP || "127.0.0.1";

        http.createServer(app).listen(port, ip, function () {
            console.log("Express server listening on " + ip + ":" + port);
        })

    }, function (err) {
        console.log("Error initializing database: " + err);
    })
    .done();
