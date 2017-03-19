var api = {
	fs : require('fs'),
	readFile : function(){
		console.log("Begin:Reading from file")
		var data = api.fs.readFileSync(__dirname+"/gamesc2b2088.csv",'utf-8');
		console.log("Reading from file")
		return data;
	}
};

module.exports = api;