<%@ page language="java" contentType="text/html; charset=EUC-KR"%> 
	<html>
  
	<head>
		<link href="css/custom.css" rel="stylesheet">
		<title>카카오페이 합격 가즈아! </title>
	</head>

	
	<script src="js/jquery-1.9.1.js"></script>
	<script src="js/todo.js"></script>
	<link rel="stylesheet" type="text/css" href="css/todo.css"/>
	
	<body>
	
	
		<div>
			<h2> 서버 개발지원자 : 문병훈 </h2> 
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
					<th>수정시간</th>
					<th>완료여부</th>
				</tr>
			</thead>
			<tbody id ="todo-content">
				<tr>
					<td>1</td>
					<td>
						<a href="#" id="777" onclick="popup_show();">청소</a>
					</td>
					<td>2018-09-04 17:30:30</td>
					<td>2018-09-04 17:30:30</td>
					<td> N </td>
				</tr>
				<tr>
					<td>2</td>
					<td>방청소</td>
					<td>2018-09-04 17:30:30</td>
					<td>2018-09-04 17:30:30</td>
					<td> N </td>
				</tr>
				<tr>
					<td>3</td>
					<td>부엌청소</td>
					<td>2018-09-04 17:30:30</td>
					<td>2018-09-04 17:30:30</td>
					<td> N </td>
				</tr>
				<tr>
					<td>4</td>
					<td>방청소</td>
					<td>2018-09-04 17:30:30</td>
					<td>2018-09-04 17:30:30</td>
					<td> N </td>
				</tr>
				<tr>
					<td>5</td>
					<td>부엌청소</td>
					<td>2018-09-04 17:30:30</td>
					<td>2018-09-04 17:30:30</td>
					<td> N </td>
				</tr>
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
		
  		    <p> 할일 상세 화면</p>
			<table>
				<colgroup>
					<col width="40%">
					<col width="60%">
				</colgroup>
				<tr>	<td>ID</td> <td></td>	</tr>
				<tr>	<td>할일</td> <td><input value="설거지" style="width:95%"></input></td>	</tr>
				<tr>	<td>등록시간</td><td></td>	</tr>
				<tr>	<td>수정시간</td><td></td>	</tr>
				<tr>	<td>완료여부</td><td>N</td>	</tr>
			</table>
			<div style="margin:10px">
				<button>내용수정</button>
				<button>할일 완료하기</button>
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
				<tr>	<td>할일</td> <td><input id="todo-nm" style="width:95%"></input></td>	</tr>
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
