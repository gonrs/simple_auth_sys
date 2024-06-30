package com.example.server.modules.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateUserEmailRequest {
    @NotEmpty(message = "Password can`t be empty.")
    @Size(min = 6, max = 20, message = "The password must be more than 6 and less than 20 characters.")
    private String password;

    @NotEmpty(message = "Name can`t be empty.")
    @Email(message = "Not a valid email address format.")
    private String newEmail;

}
