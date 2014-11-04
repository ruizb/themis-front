//var gzippo = require('gzippo');
//var express = require('express');
//var app = express();
//
//app.use(express.logger('dev'));
//app.use(gzippo.staticGzip("" + __dirname + "/bin"));
//app.listen(process.env.PORT || 5000);

var express = require('express')
var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/bin'))