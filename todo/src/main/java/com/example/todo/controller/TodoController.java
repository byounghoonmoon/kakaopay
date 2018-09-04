package com.example.todo.controller;

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
     * Description : 특정 아이디 할일 수정 (JSON)
     * 
     * Sample : http://localhost:9090/api/todo/2
     * 
     * */

    @RequestMapping(value = "/todo/{id}", method = RequestMethod.PUT)
	public Todo updateTodo(@PathVariable(value = "id") Long TodoId, @Valid @RequestBody Todo Todo) {

    	System.out.println(" ■ 변경 아이디 : " + TodoId);
    	// id 존재 여부 부터 확인 
    	Todo getTodo = TodoService.get(TodoId);
    	System.out.println(" ■ 기존 할일 명  : " + getTodo.getTitle());
    	System.out.println(" ■ 수정 할일 명  : " + Todo.getTitle());
		
    	// 할일 수정 
    	Todo.setId(getTodo.getId());
		Todo updatedTodo = TodoService.save(Todo);
		return updatedTodo;
	}
}
