package com.example.server.modules.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    @NotEmpty(message = "Name can`t be empty.")
    @Email(message = "Not a valid email address format.")
    private String email;

    @NotEmpty(message = "Password can`t be empty.")
    @Size(min = 6, max = 20, message = "The password must be more than 6 and less than 20 characters.")
    private String password;
}
