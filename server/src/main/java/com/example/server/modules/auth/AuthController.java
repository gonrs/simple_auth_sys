package com.example.server.modules.auth;

import com.example.server.modules.auth.dto.AuthResponse;
import com.example.server.modules.auth.dto.LoginRequest;
import com.example.server.modules.auth.dto.RegisterRequest;
import com.example.server.modules.auth.dto.UserInfoResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
@Validated
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/getMe")
    public ResponseEntity<UserInfoResponse> getMe(){
        return ResponseEntity.ok(authService.getMe());
    }
}
