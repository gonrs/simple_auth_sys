package com.example.server.utils.errors;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ResponseStatus;

@Component
@ControllerAdvice
public class Errors {
    @Getter
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public static class ResError extends RuntimeException {
        private final String message;

        public ResError(String message) {
            this.message = message;
        }
    }
    @Getter
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public static class AuthError extends RuntimeException {
        private final String message;

        public AuthError(String message) {
            this.message = message;
        }
    }

    @Getter
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public static class ResServerError extends RuntimeException {
        private final String message;

        public ResServerError(String message) {
            this.message = message;
        }
    }

}
