
var totalData =0;
var dataPerPage = 5;    // 한 페이지에 나타낼 데이터 수
var pageCount = 5;      // 한 화면에 나타낼 페이지 수

$(document).ready(function() {
	
	 $('#popup-todo-register').hide();
     $('#popup-todo-detail').hide();
     
     init();
});

function init(){
	
	// 
	// 1. 할일 목록 조회 
	// 2. 콜백 할일 리스트 렌더링
	// 3. paging 렌더링
	
	console.debug(" ■ 초기값 들고 오기 ");
	searchToDoList("?size=5&page=0&sort=id,asc",rendering_todo_list);
	
	

	/*
	$.ajax({
		type: "GET",
		url: "http://"+location.host+"/api/todo?size=5&page=0&sort=id,asc",
		success	: function(data) {
			rendering_todo_list(data.content);	//배열 넘김
		},
		error	: function(request, status, error) { 
			console.error("■ 초기값 생성 실패 : [" + status+"] ");
		}
	});

	
	var result={};
	var list=[];
	
	for(var i=0; i<3; i++)
	{ 
		var temp={};
		temp.id=i;
		temp.title="청소"+i;
		temp.cret="2018.09.03 18:00:00";
		temp.mdfc="2018.09.03 18:00:00";
		temp.completeYn="N";
		list.push(temp);
	}
	result.status ="200";
	result.list = list;
	var sampleData = JSON.stringify(result);	// JSON String 
	console.debug("■ □ ■ □ ■ 응 답 결 과  ");
	console.debug(sampleData.list);
	console.debug("■ □ ■ □ ■ 응 답 결 과  ");
	
	
	
	rendering_todo_list(result.list);
	paging(result.list.length, dataPerPage, pageCount, 1);
	*/
	
	
}

function rendering_todo_list(data){
	console.info(" ■ Function Call => rendering_todo_list");
	$('#todo-content').empty();
	$.each(data.content, function(idx,param){
		$('#todo-content').append(
					'<tr> <td>'
				+param.id+'</td><td>'
				+param.title+'</td><td>'
				+param.createdAt+'</td><td>'
				+param.mdfc+'</td><td>'
				+param.completeYn+'</td></tr>'
		);
	});
	paging(data.totalElements, dataPerPage, pageCount, data.pageable.pageNumber+1);
}


function rendering_todo_list_relation(data){
	console.info(" ■ Function Call => rendering_todo_list_relation");
	$('#todo-relation-list').empty();
	
	var html = new String();
	console.debug(" ■ 참조 할일 갯수 : " + data.content.length);
	$.each(data.content, function(idx,param){
		if(idx%3==0)
			html+='<li><label ><input type="radio"  val='+param.id+'>'+"ID: "+param.id+'</label>';
		else
			html+='<label><input type="radio" val='+param.id+'>'+"ID: "+param.id+'</label>';
	});
	$('#todo-relation-list').append(html);
	pagingRelation(data.totalElements, 9, pageCount, data.pageable.pageNumber+1);
}

function popup_todo_register_show(){
	// 1. 할일 목록 조회 ( 참조 걸기 위해 )
	// 2. 참조 선택 리스트 렌더링
	searchToDoList("?size=9&page=0&sort=id,asc",rendering_todo_list_relation);
	$('#popup-todo-register').show();
}

function popup_todo_register_hide(){
	$('#popup-todo-register').hide();
}

function popup_todo_detail_show(){
	$('#popup-todo-detail').show();
}

function popup_todo_detail_hide(){
	$('#popup-todo-detail').hide();
}


// 등록된 할일 조회화기 All
// http://localhost:9090/api/todo?size=100&page=0&sort=id,asc
function searchToDoList(option,callback) {
	$.ajax({
		type: "GET",
		url: "http://"+location.host+"/api/todo"+option,
		success	: function(data) {
			console.info(" ■ 조회 성공 ");
			callback(data);
			
		},
		error	: function(request, status, error) {
			console.error("■ Error : [" + status+"] ");
		}
	});
}



//할일 조회화기 특정아이디
function searchToDoById(id) {
	
	var param ='{id="",'+id+ '}';

	$.ajax({
		type: "GET",
		url: "http://"+location.host+"/api/todo/"+id,
		contentType: "application/json",
		data: JSON.stringify(param),
		success	: function(data) {
			rendering_todo_list(data);
		},
		error	: function(request, status, error, data) {
			console.error("■ Error : [" + status+"] " + data.message + "에러가 발생했습니다.");
		}
	});
}

//할일 등록하기 
function registerToDo() {
	
	console.debug(" ■ 할일 등록 하기 : " + $('#todo-nm').val());
	
	var param={};

	$.ajax({
		type: "POST",
		url: "http://"+location.host+"/api/todo/",
		data: "",
		success	: function(data) {
			alert(data.message + "강제 수행 완료되었습니다.");
			loading();
		},
		error	: function(request, status, error, data) {
			console.error("■ Error : [" + status+"] " + data.message + "에러가 발생했습니다.");
		}
	});
}



// 할일 수정하기 
function modifyToDo(id) {
	if (!confirm("할일 내용을 수정하시겠습니까?")) {
		return;
	}			
	$.ajax({
		type: "PUT",
		url: "http://"+location.host+"/api/todo/"+id,
		data: "",
		success	: function(data) {
			loading();
		},
		error	: function(request, status, error, data) {
			console.error("■ Error : [" + status+"] " + data.message + "에러가 발생했습니다.");
		}
	});
}

//할일 완료하기 
function completeToDo(id) {
	if (!confirm("할일을 완료 하시겠습니까?")) {
		return;
	}			
	$.ajax({
		type: "PUT",
		url: "http://"+location.host+"/api/todo/"+id,
		data: "",
		success	: function(data) {
			loading();	// callBack
		},
		error	: function(request, status, error, data) {
			console.error("■ Error : [" + status+"] " + data.message + "에러가 발생했습니다.");
		}
	});
	
}


// 페이징 처리
function paging(totalData, dataPerPage, pageCount, currentPage){
    
    var totalPage = Math.ceil(totalData/dataPerPage);    // 총 페이지 수
    var pageGroup = Math.ceil(currentPage/pageCount);    // 페이지 그룹
    
    var last = pageGroup * pageCount;    // 화면에 보여질 마지막 페이지 번호
    if(last > totalPage)
        last = totalPage;
    var first = last - (pageCount-1);    // 화면에 보여질 첫번째 페이지 번호
    if (first <= 0)
    	first = 1;
    var next = last+1;
    var prev = first-1;
    
    var html = "";
    
    if(prev > 0)
        html += "<a href=# id='prev'><</a> ";
    
    for(var i=first; i <= last; i++){
        html += "<a href='#' id=" + i + ">" + i + "</a> ";
    }
    
    if(last < totalPage)
        html += "<a href=# id='next'>></a>";
    
    $("#paging").html(html);    // 페이지 목록 생성
    $("#paging a").css("color", "black");
    $("#paging a#" + currentPage).css({"text-decoration":"none", 
                                       "color":"red", 
                                       "font-weight":"bold"});    // 현재 페이지 표시
                                       
    $("#paging a").click(function(){
        
        var $item = $(this);
        var $id = $item.attr("id");
        var selectedPage = $item.text();
        
        if($id == "next")    selectedPage = next;
        if($id == "prev")    selectedPage = prev;
        
        paging(totalData, dataPerPage, pageCount, selectedPage);
		
		searchToDoList("?size=5&page="+(selectedPage-1)+"&sort=id,asc",rendering_todo_list);
    });
                                       
}


// 참조 페이징 처리
function pagingRelation(totalData, dataPerPage, pageCount, currentPage){
    
    var totalPage = Math.ceil(totalData/dataPerPage);    // 총 페이지 수
    var pageGroup = Math.ceil(currentPage/pageCount);    // 페이지 그룹
    
    var last = pageGroup * pageCount;    // 화면에 보여질 마지막 페이지 번호
    if(last > totalPage)
        last = totalPage;
    var first = last - (pageCount-1);    // 화면에 보여질 첫번째 페이지 번호
    if (first <= 0)
    	first = 1;
    var next = last+1;
    var prev = first-1;
    
    var html = "";
    
    if(prev > 0)
        html += "<a href=# id='prev'><</a> ";
    
    for(var i=first; i <= last; i++){
        html += "<a href='#' id=" + i + ">" + i + "</a> ";
    }
    
    if(last < totalPage)
        html += "<a href=# id='next'>></a>";
    
    $("#paging_relation").html(html);    // 페이지 목록 생성
    $("#paging_relation a").css("color", "black");
    $("#paging_relation a#" + currentPage).css({"text-decoration":"none", 
                                       "color":"red", 
                                       "font-weight":"bold"});    // 현재 페이지 표시
                                       
    $("#paging_relation a").click(function(){
        
        var $item = $(this);
        var $id = $item.attr("id");
        var selectedPage = $item.text();
        
        if($id == "next")    selectedPage = next;
        if($id == "prev")    selectedPage = prev;
        
        pagingRelation(totalData, dataPerPage, pageCount, selectedPage);
		
		searchToDoList("?size=9&page="+(selectedPage-1)+"&sort=id,asc",rendering_todo_list_relation);
    });
                                       
}