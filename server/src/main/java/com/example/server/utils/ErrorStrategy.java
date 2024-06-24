package com.example.server.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpServerErrorException;

import java.util.ArrayList;
import java.util.List;

@Component
@ControllerAdvice
public class ErrorStrategy {

    @ExceptionHandler(Errors.ResError.class)
    public ResponseEntity<String> ResError(Errors.ResError ex) {
        return new ResponseEntity<>("{\"message\":\"" + ex.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(Errors.AuthError.class)
    public ResponseEntity<String> AuthError(Errors.AuthError ex) {
        return new ResponseEntity<>("{\"message\":\"" + ex.getMessage() + "\"}", HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(Errors.ResServerError.class)
    public ResponseEntity<String> ResError(Errors.ResServerError ex) {
        return new ResponseEntity<>("{\"message\":\"" + ex.getMessage() + "\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(HttpServerErrorException.InternalServerError.class)
    public ResponseEntity<String> InternalServerError(HttpServerErrorException.InternalServerError ex) {

        return new ResponseEntity<>("{\"message\":\"" + ex.getMessage() + "\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<String> errorsList = new ArrayList<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errorsList.add(" {\n" +
                    "   \"errorField\": \"" + error.getField() + "\",\n" +
                    "   \"message\": \"" + error.getDefaultMessage() + "\",\n" +
                    "} ");
        });
        String result = " {\n" +
                "    \"errorType\": \"ValidationError\",\n" +
                "    \"errorCodes\": \n" +
                errorsList.toString() +
                "    \n" +
                "} ";
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }
}
