package com.opentext.todo;

import java.util.Collection;
import java.util.function.Predicate;

interface TodoRepository {
    Collection<Todo> findAll();

    Todo insert(Todo Todo);

    void delete(Long todoId);

    void update(Todo Todo);

    Todo findOne(Long todoId);

    void remove(Predicate<Todo> predicate);
}