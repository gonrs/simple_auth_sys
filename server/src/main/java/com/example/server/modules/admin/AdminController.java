package com.example.server.modules.admin;

import com.example.server.modules.user.dto.SubUserResponse;
import com.example.server.modules.user.dto.gets.GetUserByEmailRequest;
import com.example.server.modules.user.dto.gets.GetUserByIdRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @PostMapping("/user/findUserByEmail")
    public ResponseEntity<SubUserResponse> findUserByEmail(@RequestBody @Valid GetUserByEmailRequest data) {
        return ResponseEntity.ok(adminService.findUserByEmail(data.getEmail()));
    }

    @PostMapping("/user/findUserById")
    public ResponseEntity<SubUserResponse> findUserById(@RequestBody @Valid GetUserByIdRequest data) {
        return ResponseEntity.ok(adminService.findUserById(data.getId()));
    }
}
