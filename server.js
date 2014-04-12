/* 
 server.js
 mongodb-rest
 
 Created by Tom de Grunt on 2010-10-03.
 Copyright (c) 2010 Tom de Grunt.
 This file is part of mongodb-rest.
 */

var fs = require("fs"),
        sys = require("sys"),
        express = require('express');

var config = {
    'server': {
        'port': 3000,
        'address': "0.0.0.0"
    },
    'flavor': "regular",
    'debug': true
};

var app = module.exports.app = express();

try {
    config = JSON.parse(fs.readFileSync(process.cwd() + "/config.json"));
} catch (e) {
    // ignore
}

module.exports.config = config;

app.configure(function() {
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.static(process.cwd() + '/public'));
    app.use(express.logger());

    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

});

require('./lib/jira-client');

if (!process.argv[2] || !process.argv[2].indexOf("expresso")) {
    app.listen(config.server.port, config.server.address);
}
