var path = require('path');
var fs = require('fs');
var cors = require('cors');
var PouchDB = require('pouchdb');
var express = require('express');
var app = express();
var http = require('http').createServer(app);
PouchDB.plugin(require('pouchdb-authentication'));

var corsOptions = {};
//corsOptions = {origin: "*"};
corsOptions = {origin: "http://127.0.0.1:8080"};

var authpouchdbfile = fs.readFileSync(__dirname+'/node_modules/pouchdb-authentication/dist/pouchdb.authentication.min.js', "utf8");
app.get('/pouchdb.authentication.min.js', function(req, res){
	//works
	res.set('Content-Type', 'text/javascript');
	res.send(authpouchdbfile);
	//works
	//res.sendFile('/node_modules/pouchdb-authentication/dist/pouchdb.authentication.min.js' , { root : __dirname});
	
});

//load file
var pouchdbfile = fs.readFileSync(__dirname+'/node_modules/pouchdb/dist/pouchdb.min.js', "utf8");
//console.log(pouchdbfile);
app.get('/pouchdb.min.js', function(req, res){
	//works
	res.set('Content-Type', 'text/javascript');
	res.send(pouchdbfile);
	//works
	//res.sendFile('/node_modules/pouchdb/dist/pouchdb.min.js' , { root : __dirname});
});

app.use("/", express.static('./public'));
app.use('/', cors(corsOptions), require('express-pouchdb')(PouchDB));
var db = new PouchDB('mydb');

//db.changes({live: true}).on('change', console.log);

db.info().then(function (info) {
	//console.log(info);
});

app.listen(8080, function() {
  console.log('Web Server listening at http://%s:%s', "0.0.0.0", 8080);
});

console.log('server started');
