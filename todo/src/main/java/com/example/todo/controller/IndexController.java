package com.example.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.example.todo.model.Todo;
import com.example.todo.repository.TodoRepository;

@RestController
public class IndexController { 

    @Autowired
   TodoRepository todoRepository;
    
	@RequestMapping("/")
	public ModelAndView test() { 
		System.out.println(" 초기화면 ");
        ModelAndView view = new ModelAndView("welcome"); 
        return view; 
    }
	
	@RequestMapping("/init")
	public void init() { 
		System.out.println(" ■ 초기 값 생성 ! ");
		todoRepository.save(new Todo("이체하기",""));
		todoRepository.save(new Todo("이체하기-농협",""));
		todoRepository.save(new Todo("이체하기-신한",""));
		todoRepository.save(new Todo("충전하기",""));
		todoRepository.save(new Todo("공부하기",""));
	    
    }

}
