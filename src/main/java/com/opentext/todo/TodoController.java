package com.opentext.todo;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/todos")
class TodoController {
    private TodoRepository todoRepository;

    @Autowired
    TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Collection<Todo> todos() {
        return todoRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public void deleteCompleted() {
        todoRepository.remove(Todo::isCompleted);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Todo> insert(@RequestBody Todo todo) {
        Todo savedTodo = todoRepository.insert(todo);
        return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{todoId}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long todoId) {
        todoRepository.delete(todoId);
    }

    @RequestMapping(value = "/{todoId}", method = RequestMethod.PUT)
    public void put(@PathVariable Long todoId, @RequestBody Todo todo) {
        Todo existingTodo = todoRepository.findOne(todoId);
        existingTodo.merge(todo);

        todoRepository.update(existingTodo);
    }
}