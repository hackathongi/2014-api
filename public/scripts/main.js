require.config({
    paths: {
        jquery: 'libs/jquery-1.11.0.min',
        "jquery.bootstrap": "libs/bootstrap.min",
        underscore: 'libs/underscore-min',
        backbone: 'libs/backbone-min'
    }

});

require([

    // Load our app module and pass it to our definition function
    'app'
], function(App){
    // The "app" dependency is passed in as "App"
    App.initialize();
    //App.navigate("shops")
});