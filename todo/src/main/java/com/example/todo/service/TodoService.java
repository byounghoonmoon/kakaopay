package com.example.todo.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.todo.model.Todo;

public interface TodoService {

	Todo save(Todo n);
	void delete(Long id);
	Todo get(Long id);
	Page<Todo> getAllTodo(Pageable page);
	List<Todo> getAllTodo();
}
