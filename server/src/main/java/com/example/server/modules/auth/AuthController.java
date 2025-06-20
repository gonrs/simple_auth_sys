package com.example.server.modules.auth;

import com.example.server.modules.auth.dto.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

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

    @PostMapping("/googleAuth")
    public ResponseEntity<AuthResponse> googleAuth(@RequestBody GoogleAuthRequest data) {
        return ResponseEntity.ok(authService.googleAuth(data.getGoogleCredToken()));
    }

    @PostMapping("/refreshToken")
    public void refreshToken(HttpServletResponse response, HttpServletRequest request) throws IOException {
        authService.refreshToken(request, response);
    }

    @GetMapping("/getMe")
    public ResponseEntity<UserInfoResponse> getMe() {
        return ResponseEntity.ok(authService.getMe());
    }
}
