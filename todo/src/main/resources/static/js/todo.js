
var totalData =0;
var dataPerPage = 5;    // 한 페이지에 나타낼 데이터 수
var pageCount = 5;      // 한 화면에 나타낼 페이지 수

$(document).ready(function() {
	
	 $('#popup-todo-register').hide();
     $('#popup-todo-detail').hide();
      $('#btn-todo-modify').click(modifyToDo);
       $('#btn-todo-complete').click(completeToDo);
     init();
});

function init(){
	
	// 
	// 1. 할일 목록 조회 
	// 2. 콜백 할일 리스트 렌더링
	// 3. paging 렌더링
	
	console.debug(" ■ 초기값 들고 오기 ");
	searchToDoList("?size=5&page=0&sort=id,asc",rendering_todo_list);
	
	
}

function convertFlag(param){
	if(param>0)
		return 'Y';
	else
		return 'N';
}
function rendering_todo_list(data){
	console.info(" ■ Function Call => rendering_todo_list");
	$('#todo-content').empty();
	$.each(data.content, function(idx,param){
		console.debug(param)
		$('#todo-content').append(
					'<tr id='+"todo-"+param.id+' rel="'+param.relation+'"><td>'
				+param.id+'</td><td val='+param.title+'>'
				+'<a href="#" onclick="popup_todo_detail_show('+param.id+')");>'
				+param.title+param.relation+'</a></td><td>'
				+param.createTime+'</td><td>'
				+param.completeTime+'</td><td>'
				+convertFlag(param.completeYN)+'</td></tr>'
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
	searchToDoList_sample("?size=9&page=0&sort=id,asc",rendering_todo_list_relation);
	$('#todo-title').val("");
	$('#popup-todo-register').show();
}

function popup_todo_register_hide(){
	$('#popup-todo-register').hide();
}

function popup_todo_detail_show(id){
	
	$('#detail-todo-id').text( $("#todo-"+id).children().eq(0).text());
	$('#detail-todo-id').attr('rel', $("#todo-"+id).attr('rel'));
	$('#detail-todo-title').val( $("#todo-"+id).children().eq(1).attr('val'));
	$('#detail-todo-createTime').text( $("#todo-"+id).children().eq(2).text());
	$('#detail-todo-completeTime').text( $("#todo-"+id).children().eq(3).text());
	$('#detail-todo-completeYN').text( $("#todo-"+id).children().eq(4).text());
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



//할일 조회 특정아이디
function searchToDoById(id, callback) {
	
		$.ajax({
		type: "GET",
		url: "http://"+location.host+"/api/todo/"+id,
		contentType: "application/json",
		data: "",
		success	: function(data) {
			callback(data);
		},
		error	: function(request, status, error) {
			console.error("■ Error 조회에러 : [" + request+"] " );
		}
	});
	}
//할일 조회 특정아이디
function searchToDoByIdComplete(id) {
	
	var result = false;
	
	$.ajax({
		type: "GET",
		url: "http://"+location.host+"/api/todo/"+id,
		contentType: "application/json",
		data: "",
		success	: function(data) {
			if(data.completeYN>0)
				result = false;
			else
				result = true;
		},
		error	: function(request, status, error) {
			console.error("■ Error 조회에러 : [" + request+"] " );
		}
	});

	if(result)
		console.debug("■ ID : "+id+" 완료 ! ");
	else
		console.debug("■ ID : "+id+" 미완료 ! ");
	
	return result;
}

//할일 등록하기 
function registerToDo() {
	
	// 1. 할일명 가져오기
	// 2. 참조걸 할일 선택 (Option)
	// 3. Rest API 호출 POST 
		
	var relation ="";
	$('input:radio:checked').each(function(){
		relation+="@"+$(this).attr('val');
	});
	
	var param={};
	param.title = $('#todo-title').val();
	param.relation = relation;
	param.completeYN ="0";
	
	console.info("● 등록 파라미터 " );
	console.info(param);
	
	if(param.title=="")
	{
		alert("할일명을 입력하세요! ");
		return;
	}
	var jsonData = JSON.stringify(param);	// JSON String

	/*
	alert("정상적으로 등록 되었습니다.");
	popup_todo_register_hide();
	init_test();
	*/
	
	$.ajax({
		type: "POST",
		url: "http://"+location.host+"/api/todo/",
		contentType: "application/json",
		data: jsonData,
		success	: function(data) {
			alert("정상적으로 등록 되었습니다.");
			popup_todo_register_hide();
			init();
		},
		error	: function(request, status, error) {
			console.error("■ 등록 Error : [" + status+"] ");
		}
	});
}



// 할일 수정하기 
function modifyToDo() {

	// 1. 수정대상 할일 아이디
	// 2. 수정할일 명 가져오기
	// 3. rest API 호출 PUT
	
	var id = $('#detail-todo-id').text();
	
	var param ={};
	param.id = id;
	param.title = $('#detail-todo-title').val();
	
	var jsonData = JSON.stringify(param);	// JSON String
	
	if (!confirm("할일명을 '"+ param.title +"'로 수정 하시겠습니까?")) {
		return;
	}			
	$.ajax({
		type: "PUT",
		url: "http://"+location.host+"/api/todo/"+id,
		contentType: "application/json",
		data: jsonData,
		success	: function(data) {
			alert("정상적으로 수정 되었습니다.");
			popup_todo_detail_hide();
			init();
		},
		error	: function(request, status, error) {
			console.error("■ 수정 Error : [" + status+"] ");
		}
	});
}

//할일 완료하기 
function completeToDo() {
	
	// 1. 기 완료처리 여부 
	// 2. 참조 할일 완료처리 여부 확인 
	
	var id = $('#detail-todo-id').text();
	var completeYN = $('#detail-todo-completeYN').text();
	var relation =$('#detail-todo-id').attr('rel');
	
	if(completeYN =="Y"){
		alert('이미 완료처리 되었습니다.');
		return;
	}
	
	console.debug(" ■ 참조대상 : " + relation);

	if(relation!=""){
		console.debug("참조대상 존재!");
		if(!checkRelation(relation))
			return;
	}
	
	var param ={};
	param.id = id;
	param.completeYN = 1;
	
	console.debug(" ■ 할일 Parameter ");
	console.debug(param);
	
	var jsonData = JSON.stringify(param);	// JSON String
	
	if (!confirm("id '"+id + "' 할일을 완료로 등록 하시겠습니까?")) {
		return;
	}			
	$.ajax({
		type: "PUT",
		url: "http://"+location.host+"/api/todo/"+id,
		contentType: "application/json",
		data: jsonData,
		success	: function(data) {
			alert("정상적으로 완료 되었습니다.");
			popup_todo_detail_hide();
			init();
		},
		error	: function(request, status, error) {
			console.error("■ 할일 완료처리 Error : [" + status+"] ");
		}
	});
	
}

function checkRelation(param){
	
	// 1. 참조값 StringTockernize
	var rel = param.split('@');
	var result = true;
	
	console.info (" ■ 참조 배열 " + rel.length);
	for(var i=1; i<rel.length; i++)
	{
		console.info(" ● 참조 :" + rel[i]);
		if(	searchToDoByIdComplete( rel[i]) )
		{
			alert("할일 ID "+ rel[i] + "가 완료되지 않았습니다.")
			result = false;
			return result;
		}
	}
	
	return result; 
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
