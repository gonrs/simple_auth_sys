package com.example.server.modules.auth.dto;

import com.example.server.modules.user.helpers.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoResponse {
    private Long id;
    private String userName;
    private String email;
    private boolean emailVerification;
    private Role role;
}
