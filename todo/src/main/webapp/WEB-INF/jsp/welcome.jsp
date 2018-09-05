<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<html>
  
	<head>
		<link href="css/custom.css" rel="stylesheet">
		<title>카카오페이 합격 가즈아! </title>
	</head>

	
	<script src="js/jquery-1.9.1.js"></script>
	<script src="js/todo.js?ver=1x">as</script>
	<link rel="stylesheet" type="text/css" href="css/todo.css"/>
	
	<body> 
	
	
		<div style="width:800px;">
			<h2> 서버 개발 포지션 : 문병훈 </h2>
			<button id="initData">테스트 데이터 생성</button>
		</div>
		
		<div id ="todo-table" style="width:800px;">
		<table>
			<colgroup>
				<col width="10%">
				<col width="30%">
				<col width="25%">
				<col width="25%">
				<col width="10%">
			</colgroup>
			<thead>
				<tr>
					<th>id</th>
					<th>할일</th>
					<th>등록시간</th>
					<th>완료시간</th>
					<th>완료여부</th>
				</tr>
			</thead>
			<tbody id ="todo-content">
			</tbody>
		</table>
		<div class="pagingWrap" id ="paging">
		</div>
		<div class="footer" style="width:100%">
			<div class="footer-button"><button onclick="popup_todo_register_show();">할일 등록</button></div>
		</div>
		
	</div>	
	
	<div id="popup-todo-detail" class="popup" style="width:450px;">
		<div class="popup-table popup-content" style="width:400px;" >
		
  		    <p><strong>할일 상세</strong></p>
 			<table>
				<colgroup>
					<col width="40%">
					<col width="60%">
				</colgroup>
				<tr>	<td>ID</td>				 <td id="detail-todo-id" class="detail-todo-content"></td>	</tr>
				<tr>	<td>할일</td> <td><input id="detail-todo-title" class="detail-todo-content" style="width:95%"></input></td>	</tr>
				<tr>	<td>참조된 할일 ID</td><td id="detail-todo-relation" class="detail-todo-content"></td>	</tr>
				<tr>	<td>등록시간</td><td id="detail-todo-createTime" class="detail-todo-content"></td>	</tr>
				<tr>	<td>완료시간</td><td id="detail-todo-completeTime" class="detail-todo-content"></td>	</tr>
				<tr>	<td>완료여부</td><td id="detail-todo-completeYN" class="detail-todo-content"></td>	</tr>
			</table>
			<div style="margin:10px">
				<button id="btn-todo-modify">할일명 수정</button>
				<button id="btn-todo-complete">할일 완료</button>
				<button onclick="popup_todo_detail_hide();">닫기</button>
			</div>
		</div>
	</div>
  	
  	
  	<div id="popup-todo-register" class="popup" style="width:450px;">
		<div class="popup-table popup-content" style="width:400px;" >
  		    <p><strong>할일 등록</strong></p>
			<table>
				<colgroup>
					<col width="40%">
					<col width="60%">
				</colgroup>
				<tr>	<td>할일</td> <td><input id="todo-title" style="width:95%"></input></td>	</tr>
			</table>
			
			<p><strong>참조 할일 선택</strong></p>
			
			<div id ="todo-relation-list" style="width:200px">
				
			</div>
			
			<div class="pagingWrap" id ="paging_relation" style="width:200px">
			</div>
			
			<div style="margin:10px">
				<button onclick="registerToDo();" id="todo-register">등록하기</button>
				<button onclick="popup_todo_register_hide();">닫기</button>
			</div>
	</div>
		</div>
	</body>

</html>
