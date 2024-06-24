package com.example.server.modules.auth;

import com.example.server.config.JwtService;
import com.example.server.modules.auth.dto.AuthResponse;
import com.example.server.modules.auth.dto.LoginRequest;
import com.example.server.modules.auth.dto.RegisterRequest;
import com.example.server.modules.auth.dto.UserInfoResponse;
import com.example.server.modules.user.User;
import com.example.server.modules.user.UserService;
import com.example.server.modules.user.helpers.Role;
import com.example.server.utils.Errors;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
//        Create user by request
        User user = User.builder()
                .name(request.getUserName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
//        Save user
        userService.create(user);
//        Generate token
        String jwtToken = jwtService.generateToken(user);
//        Return user with token
        UserInfoResponse userInfoResponse = UserInfoResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .userName(user.getName())
                .emailVerification(user.isEmailVerification())
                .role(user.getRole())
                .build();
        return AuthResponse.builder().user(userInfoResponse).token(jwtToken).build();
    }

    public AuthResponse login(LoginRequest request) {
//        Find user by email
        User user = userService.getByEmail(request.getEmail());
        if (user == null) {
            throw new Errors.AuthError("Email not found.");
        }
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new Errors.AuthError("Password is incorrect.");
        }
//        Auth user to Spring Security Context
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

//        Generate token
        String jwtToken = jwtService.generateToken(user);
//        Return user with token
        UserInfoResponse userInfoResponse = UserInfoResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .userName(user.getName())
                .emailVerification(user.isEmailVerification())
                .role(user.getRole())
                .build();
        return AuthResponse.builder().user(userInfoResponse).token(jwtToken).build();
    }

    public UserInfoResponse getMe() {
        User user = userService.getCurrentUser();
        return UserInfoResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .userName(user.getName())
                .emailVerification(user.isEmailVerification())
                .role(user.getRole())
                .build();
    }
}
