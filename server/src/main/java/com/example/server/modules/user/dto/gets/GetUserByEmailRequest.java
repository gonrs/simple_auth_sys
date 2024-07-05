package com.example.server.modules.user.dto.gets;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetUserByEmailRequest {
    @NotEmpty(message = "Email can`t be empty.")
    @Email(message = "Not a valid email address format.")
    private String email;
}
