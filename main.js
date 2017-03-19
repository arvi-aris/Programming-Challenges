var express = require('express');
var app = express();
var server = require('./server.js');
var api = require('./api.js');
var bodyParser = require('body-parser')
var main = {};
main.ready = false;

eventEmitter = require('./commonEmitter.js');
app.use(express.static('assets'))
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.get('/',function(req,res){
	res.sendFile(__dirname+'/home.html');
	server.init();
});

app.listen(8080,function(){
   	console.log('listening....')
});

main.readFile = function(){
	console.log("Begin:Reading")
	server.fileContent = api.readFile();
	console.log(server.fileContent)
 	server.parseFile(server.fileContent);
}

eventEmitter.addListener("Empty DB",function(){
	console.log("EmptyDB");
	main.readFile();
});

eventEmitter.addListener('DB has records',function(){
	main.ready = true;
	console.log("DB has objects");
});

eventEmitter.addListener("DB ready",function(data){
	main.ready = true;
	console.log("DB Ready")
}); 

eventEmitter.addListener("Data retrieved",function(data){
	//console.log(main.ready)
	main.ready = true;
});

app.get('/serverReady',function(req,res){
	res = main.configureHeader(res);
	res.send(main.ready)
});

app.post('/getRecords',function(req,res){
	var start = parseInt(req.body.start);
	var stop = parseInt(req.body.stop);
	res = main.configureHeader(res);
	data = server.routeToDb(start,res,false);
});

app.post('/searchRecords',function(req,res){
	var input = req.body.searchInput;
	res = main.configureHeader(res);
	server.routeToDb(input,res,true);
});

app.get('/sortRecords',function(req,res){
	var order = req.query.order;
	res = main.configureHeader(res);
	server.sortDB(order,res);
});

main.configureHeader = function(res){
	res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    return res;
}