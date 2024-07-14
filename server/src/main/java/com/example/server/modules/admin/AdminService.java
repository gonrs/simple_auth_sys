package com.example.server.modules.admin;

import com.example.server.modules.user.UserService;
import com.example.server.modules.user.dto.SubUserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserService userService;

    public SubUserResponse findUserByEmail(String email) {
        return userService.findUserByEmail(email);
    }

    public SubUserResponse findUserById(long id) {
        return userService.findUserById(id);
    }
}
