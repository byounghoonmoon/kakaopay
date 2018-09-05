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
		todoRepository.save(new Todo("신기술 역량 확보",""));
		todoRepository.save(new Todo("커피먹기-페이 결제",""));
		todoRepository.save(new Todo("N빵하기-페이 이체",""));
		todoRepository.save(new Todo("기프티콘 발송-페이인증",""));
		todoRepository.save(new Todo("이직하기-카카오페이","@1@2@3@4"));
     }     

}
