package com.example.server.modules.user.dto;

import com.example.server.modules.user.helpers.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubUserResponse {
    private Long id;
    private String userName;
    private String email;
    private Role role;
}
