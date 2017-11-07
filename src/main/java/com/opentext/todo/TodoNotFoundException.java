package com.opentext.todo;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
class TodoNotFoundException extends RuntimeException {
    private final Long id;

    TodoNotFoundException(Long id) {
        super("Todo [id=" + id + "] not found");
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}