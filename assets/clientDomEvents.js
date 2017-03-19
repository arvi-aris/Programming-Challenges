function attachEvents (){
	var paginationBtns = document.getElementsByClassName('page');
	for(var i=0;i<paginationBtns.length;i++){
		paginationBtns[i].addEventListener('click',movePage);
	}
	var searchElement = document.getElementById('gameSearch');
	searchElement.addEventListener('keyup',search);

	var sortBtn = document.getElementById('sort');
	sortBtn.addEventListener('click',sort); 

	var refreshBtn = document.getElementById('refresh');
	refreshBtn.addEventListener('click',getRecords);
}