package com.example.server.utils.errors;

import com.example.server.utils.errors.dto.ResponseError;
import com.example.server.utils.errors.dto.ResponseValidateError;
import com.example.server.utils.errors.dto.ValidErrorCodes;
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
    public ResponseEntity<ResponseError> ResError(Errors.ResError ex) {
        ResponseError error = ResponseError.builder().errorType("ClientError").message(ex.getMessage()).build();
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Errors.AuthError.class)
    public ResponseEntity<ResponseError> AuthError(Errors.AuthError ex) {
        ResponseError error = ResponseError.builder().errorType("AuthError").message(ex.getMessage()).build();
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(Errors.ResServerError.class)
    public ResponseEntity<ResponseError> ResError(Errors.ResServerError ex) {
        ResponseError error = ResponseError.builder().errorType("ServerError").message(ex.getMessage()).build();
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(HttpServerErrorException.InternalServerError.class)
    public ResponseEntity<ResponseError> InternalServerError(HttpServerErrorException.InternalServerError ex) {
        ResponseError error = ResponseError.builder().errorType("ServerError").message(ex.getMessage()).build();
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseValidateError> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<ValidErrorCodes> errorsList = new ArrayList<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errorsList.add(ValidErrorCodes.builder().errorField(error.getField()).message(error.getDefaultMessage()).build());
        });
        ResponseValidateError error = ResponseValidateError.builder().errorType("ValidationError").errorCodes(errorsList).message("Check your details are correct").build();
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
