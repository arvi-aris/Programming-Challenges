var api = require('./api.js');
var db = require('./db.js');
var server = {
	eventEmitter : require('./commonEmitter.js'),
	/*
	 * Method to start mongo
	 */
	init : function() {
		db.startMongo();
	},
	/*
	 * Method to parse file
	 */
	parseFile : function(){
		 var fileRows = server.fileContent.split(/\r\n|\n/);
		 var headerRows = fileRows.splice(0,1)
		 headerRows = headerRows[0].split(',');
		 console.log("fileRows"+fileRows.length);
		 for(var i=0;i<fileRows.length;i++){
		 	var temp = {};
		 	var inRow =fileRows[i].split(',');
		 	for(var j=0;j<inRow.length;j++){
		 		temp[headerRows[j]] = inRow[j];
		 	};
		 	console.log("storing to db..")
		 	db.storeFile(temp)
		 }
	},
	/*
	 * Method to get records
	 */
	getRecords:function(){
		db.getHomeRecords();
	},
	/*
	 * Method to route to DB
	 */
	routeToDb:function(param,response,isSearch){
		if(!isSearch) db.getRecordsFromDB(param,response);
		else db.searchRecordsFromDB(param,response);
	},
	/*
	 * Method to route to sort DB
	 */
	sortDB:function(param,response){
		db.sortFromDB(param,response);
	}
};


module.exports = server;