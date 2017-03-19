var paginationIndex = {
	start :  1,
	stop : 4
};

var serverReady = function(){
	getRecords();
};

var serverBusy = function(){
	document.getElementById('msg').innerText="Server is little busy... please wait for few seconds";
	checkInterval = window.setTimeout(function(){
		serverCheck(serverReady,serverBusy)
	},5000);
};

var init= function(){
	attachEvents();
	serverCheck(serverReady,serverBusy);
};

var movePage = function(that){
	var action = that.target.attributes.act.value;
	if(action == "prev"){
		if(paginationIndex.start == 1) return;
		paginationIndex.start -= 4;
		paginationIndex.stop -= 4;
	}else{
		paginationIndex.start += 4;
		paginationIndex.stop += 4;
	}
	getRecords();
};


init();


