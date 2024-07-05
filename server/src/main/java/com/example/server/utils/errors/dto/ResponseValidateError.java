package com.example.server.utils.errors.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseValidateError {
    private String errorType;
    private String message;
    private List<ValidErrorCodes> errorCodes;
}
