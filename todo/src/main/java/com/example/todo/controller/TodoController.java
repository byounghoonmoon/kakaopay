package com.example.todo.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.todo.model.Todo;
import com.example.todo.service.TodoService;

@RestController
@RequestMapping("/api")
public class TodoController {
	@Autowired
    TodoService	TodoService;
  
    /*
     * Method : POST 
     * Basic : ~/api/todo
     * Description : 할일 등록 하기 (JSON)
     * 
     * Sample : http://localhost:9090/api/todo
     * 
     * */    

    @RequestMapping(value = "/todo", method = RequestMethod.POST)
    public Todo createTodo(@Valid @RequestBody Todo Todo) {
        return TodoService.save(Todo);

    }
    
    /*
     * Method : GET
     * Basic : ~/api/todo/{id}
     * Description : 특정 아이디 할일 찾기
     * 
     * Sample : http://localhost:9090/api/todo/1
     * 
     * */

    @RequestMapping(value = "/todo/{id}", method = RequestMethod.GET)
    public Todo get(@PathVariable long id) {
    	return TodoService.get(id);
    }
    
    
    /*
     * Method : GET
     * Basic : ~/api/todo?{size}&{page}&{sort},asc 
     * Description : 할일 목록 가져오기 (페이징 처리)
     * 
     * Sample : http://localhost:9090/api/todo?size=100&page=0&sort=id,asc
     * 
     * 
     */
    @RequestMapping(value = "/todo", method = RequestMethod.GET)
    public Page<Todo> getAll(Pageable _page) {
    	return TodoService.getAllTodo(_page);
    }
    
    
    /*
     * Method : DELETE 
     * Basic : ~/api/todo/{id}
     * Description : 특정 아이디 할일 삭제
     * 
     * Sample : http://localhost:9090/api/todo/2
     * 
     * */
    @RequestMapping(value = "/todo/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteTodo(@PathVariable(value = "id") Long TodoId) {

    	TodoService.delete(TodoId);
        return ResponseEntity.ok().build();

    }
    
    
    /*
     * Method : PUT 
     * Basic : ~/api/todo/{id}
     * Description : 특정 아이디 할일명 또는 완료 처리 (JSON)
     * 
     * Sample : http://localhost:9090/api/todo/2
     * 
     * */

    @RequestMapping(value = "/todo/{id}", method = RequestMethod.PUT)
	public Todo updateTodo(@PathVariable(value = "id") Long TodoId, @Valid @RequestBody Todo reqTodo) {
    	
    	System.out.println(" **********************************");
    	System.out.println(" ■ PUT Method : /todo/{id} ");
    	System.out.println(" ■ Target id  : " + TodoId);
    	System.out.println(" ■ Request Info : Title ==>" + reqTodo.getTitle() +" , CompleteYN ==> " +reqTodo.getCompleteYN());
    	
    	// 1. ID 존재확인
    	Todo getTodo = TodoService.get(TodoId); 
    	System.out.println(" ■ Id Exist ? : " + getTodo.getId());
    	
    	// 2. ID 존재 하므로, 아이디 셋팅
    	System.out.println(" ■ Id Exist ! ");
    	reqTodo.setId(getTodo.getId());
		  
    	// 2. 할일명 인지 완료처리 구분 방법 
    	if(reqTodo.getTitle()!=null) {
    		System.out.println(" ■ Title Change  [" + getTodo.getTitle() + " ==> " + reqTodo.getTitle() + " ]");
    		getTodo.setTitle(reqTodo.getTitle());
    	}
    	else if(reqTodo.getCompleteYN() > 0){
    		System.out.println(" ■ ToDo Complete [" + getTodo.getCompleteYN() + " ==> " + reqTodo.getCompleteYN() + " ]");
    		getTodo.setCompleteYN(reqTodo.getCompleteYN());
    		getTodo.setCompleteTime(LocalDateTime.now());   
    	}        
    	     
    	Todo updatedTodo = TodoService.save(getTodo);

    	System.out.println(" **********************************");
		return updatedTodo;
	}
}
