var	eventEmitter = require('./commonEmitter.js');
var mongo = {
	MongoClient : require('mongodb').MongoClient,
	/*
	 * Method to connect with DB
	 */
	startMongo : function(){
		mongo.MongoClient.connect('mongodb://arvi:arvi7878@ds135700.mlab.com:35700/capillary-game-arena', (err, database) => {
		   if(err){
		   	console.log(err);
		   	return false;
		   }
		   mongo.db =database;
		   console.log("DB connection success");
		   mongo.lookForObjects();
		});
	},
	/*
	 * Store document in DB
	 * param      {object} <file> { document to be stored in DB }
	 */
	storeFile:function(file){
		this.db.collection('games').save(file, function(err, result){
		    if (err) return console.log(err)
		    console.log('saved to database');
			eventEmitter.emit('DB ready');
		});
	},
	/*
	 * Checks whether DB has objects
	 */
	lookForObjects:function(){
		mongo.db.collection('games').find().count()
			.then(function(count){
				if(count==0){
					eventEmitter.emit('Empty DB');
				}else{
					eventEmitter.emit('DB has records');
				}
			})
		
	},
	/*
	 * Gets home records
	 */
	getHomeRecords:function(){
		mongo.db.collection('games').find().limit(4).toArray()
			.then(function(data){
				//console.log(data)
			})
		eventEmitter.emit("Data retrieved",data);
	},
	/*
	 * Gets records from DB 
	 * param      {integer} <start> { start index }
	 * param      {response object} <response> 
	 */
	getRecordsFromDB:function(start,response){
		skip = start - 1;
		limit = 4;
		mongo.db.collection('games').find().skip(skip).limit(limit).toArray()
			.then(function(data){
				response.send(data);
			})
	},
	/*
	 * Search records from DB
	 * param      {string} <name> { search input }
	 * param      {response object} <response> 
	 */
	searchRecordsFromDB:function(name,response){
		name = new RegExp(".*"+name+".*");
		mongo.db.collection('games').find({"title":{$regex:name,$options: 'ig'}}).toArray()
			.then(function(data){
				console.log(data)
				response.send(data);
			})
	},
	/*
	 * Sort records from DB
	 * param      {string} <order> { order }
	 * param      {response object} <response>  
	 */
	sortFromDB:function(order,response){
		if(order == "asc") ovalue = 1
		else ovalue=-1;
		mongo.db.collection('games').find().sort({"score":ovalue}).toArray()
			.then(function(data){
				console.log(data)
				response.send(data);
			})
	}
};
module.exports = mongo;