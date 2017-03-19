var serverCheck = function (successCb,failCb) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "serverReady", true);
        xhr.setRequestHeader("Accept", "*/*");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200 && xhr.responseText == "true") {

               successCb()
            } else if (xhr.readyState === 4 && xhr.status == 200 && xhr.responseText == "false") {
              failCb()
            } 
        };
};

var getRecords = function(callback){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "getRecords", true);
        xhr.setRequestHeader("Accept", "*/*");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
       var param = "start="+paginationIndex.start+"&stop="+paginationIndex.stop;
            
        xhr.send(param);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                render(xhr.responseText)
            } else if (xhr.readyState === 4 && xhr.status !== 200) {
               console.log("nayyy")
            }
        };
};

var search = function(that){
    if (that.keyCode == 13) {
        var searchInput = that.target.value.trim();
        if(searchInput.length<=0) {
            getRecords();
            return;
        }
        var xhr = new XMLHttpRequest();
            xhr.open("POST", "searchRecords", true);
            xhr.setRequestHeader("Accept", "*/*");
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            var param = 'searchInput='+searchInput;
                
            xhr.send(param);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    render(xhr.responseText)
                } else if (xhr.readyState === 4 && xhr.status !== 200) {
                   console.log("nayyy")
                }
            };
    }
};

var sort = function(that){
    var order = that.target.attributes.order.value;
    if(order == "asc"){
        that.target.attributes.order.value = "desc"
    }else{
        that.target.attributes.order.value = "asc"
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "sortRecords?order="+order, true);
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            render(xhr.responseText)
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
           console.log("nayyy")
        }
    };
};



var render = function(resp){
    var message = document.getElementById("msg");
    if(message) message.parentNode.removeChild(message);
    var response = JSON.parse(resp);
    var grid =document.getElementById("gameContent");
    tempDOM = ""
    for(var i=0;i<response.length;i++){
            var object = response[i];
            if(object.title == "" && Object.keys(object).length<=2) continue;
            var markup = '<div class="mdl-cell mdl-cell--4-col">';
            var card = '<div data-id="'+object._id+'" class="mdl-card mdl-shadow--4dp"><div class="mdl-card__supporting-text">'
            var messageBox = '<div class="mdl-card__supporting-text"> <pre></br>Title : '+ object.title +'</br>Platform : '+object.platform+'</br>Score : '+object.score+'</br>Genre : '+object.genre+'</br>Editor"s choice : '+object.editors_choice+'</pre></div></div></div></div>';
            var a = markup + card + messageBox;
            tempDOM += a;
    };
    grid.innerHTML = tempDOM;
}

