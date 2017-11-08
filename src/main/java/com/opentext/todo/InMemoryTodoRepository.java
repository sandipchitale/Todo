package com.opentext.todo;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.function.Predicate;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Repository;

@Repository
class InMemoryTodoRepository implements TodoRepository {
    private AtomicLong counter = new AtomicLong(0);
    private Map<Long, Todo> map = new ConcurrentHashMap<>();

    @Override
    public Collection<Todo> findAll() {
        return map.values();
    }
    
    @PostConstruct
    void init() {
    	insert(Todo.from("Get Milk"));
    	insert(Todo.from("Get Bread"));
    	insert(Todo.from("Get Sugar"));
    	insert(Todo.from("Get Silk"));
    	insert(Todo.from("Clean Garage"));
    	insert(Todo.from("Clean Attic"));
    }

    @Override
    public Todo insert(Todo Todo) {
        Long id = counter.incrementAndGet();
        Todo.setId(id);
        map.put(id, Todo);

        return Todo;
    }

    @Override
    public void delete(Long todoId) {
        checkIfExists(todoId);
        map.remove(todoId);
    }

    @Override
    public void update(Todo Todo) {
        checkIfExists(Todo.getId());
        map.put(Todo.getId(), Todo);
    }

    @Override
    public Todo findOne(Long todoId) {
        checkIfExists(todoId);
        return map.get(todoId);
    }

    @Override
    public void remove(Predicate<Todo> predicate) {
        map.forEach((k,v) -> {
            if (predicate.test(v)) {
                map.remove(k);
            }
        });
    }

    private void checkIfExists(Long todoId) {
        if (!map.containsKey(todoId)) {
            throw new TodoNotFoundException(todoId);
        }
    }
}