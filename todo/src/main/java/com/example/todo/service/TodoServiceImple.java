package com.example.todo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.todo.exception.ResourceNotFoundException;
import com.example.todo.model.Todo;
import com.example.todo.repository.TodoRepository;

@Service
public class TodoServiceImple implements TodoService {

    @Autowired
    TodoRepository todoRepository;
	@Override
	public Todo save(Todo n) {
		// TODO Auto-generated method stub
		return todoRepository.save(n);
	}

	@Override
	public void delete(Long id) {
		Todo note = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo-List", "id", id));
		todoRepository.delete(note);

	}

	@Override
	public Todo get(Long id) {
		// TODO Auto-generated method stub
		return todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo-List", "id", id));
	}

	@Override
	public Page<Todo> getAllTodo(Pageable page) {
		return todoRepository.findAll(page);
	}

	@Override
	public List<Todo> getAllTodo() {
		return todoRepository.findAll();
	}

}
