package com.example.server.modules.auth;

import com.example.server.modules.auth.dto.*;
import com.example.server.modules.user.User;
import com.example.server.modules.user.UserService;
import com.example.server.modules.user.helpers.Role;
import com.example.server.utils.Errors;
import com.example.server.utils.GoogleAuthStrategy;
import com.example.server.utils.JwtService;
import com.example.server.utils.MailSenderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.SecureRandom;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final GoogleAuthStrategy googleAuthStrategy;
    private final MailSenderService mailSenderService;

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
//        Generate tokens
        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
//        Return user with token
        UserInfoResponse userInfoResponse = UserInfoResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .userName(user.getName())
                .emailVerification(user.isEmailVerification())
                .role(user.getRole())
                .build();
        return AuthResponse.builder().user(userInfoResponse).refresh_token(refreshToken).access_token(jwtToken).build();
    }

    public AuthResponse login(LoginRequest request) {
//        Find user by email
        User user = userService.getByEmail(request.getEmail());
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
        String refreshToken = jwtService.generateRefreshToken(user);
//        Return user with token
        UserInfoResponse userInfoResponse = UserInfoResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .userName(user.getName())
                .emailVerification(user.isEmailVerification())
                .role(user.getRole())
                .build();
        return AuthResponse.builder().user(userInfoResponse).refresh_token(refreshToken).access_token(jwtToken).build();
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

    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader("Authorization");
        final String refreshToken;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUserEmail(refreshToken).orElseThrow(() -> new Errors.AuthError("Invalid token."));
        if (userEmail != null) {
            UserDetails userDetails = this.userService.getByEmail(userEmail);
            if (jwtService.isTokenValid(refreshToken, userDetails)) {
                String accessToken = jwtService.generateToken(userDetails);
                var authResponse = RefreshTokenResponse.builder().access_token(accessToken).refresh_token(refreshToken).build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }

    @SneakyThrows
    public AuthResponse googleAuth(String googleCredToken) {
        String email = googleAuthStrategy.getUserDataByType(googleCredToken, "email");
        String name = googleAuthStrategy.getUserDataByType(googleCredToken, "name");
        //
        User user;
        if (!userService.isValidEmail(email)) {
            //        Create user by request
            String newPassword = userService.generatePassword();
            User newUser = User.builder()
                    .name(name)
                    .email(email)
                    .password(passwordEncoder.encode(newPassword))
                    .emailVerification(true)
                    .role(Role.USER)
                    .build();
            //        Save user
            userService.create(newUser);
            String emailBody = "Here is your auto-generated password: " + newPassword;

            mailSenderService.sendEmail(newUser.getEmail(), emailBody, "Your auto-generated password");
            user = newUser;
        } else {
            user = userService.getByEmail(email);
        }
        //        Generate tokens
        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        //        Return user with token
        UserInfoResponse userInfoResponse = UserInfoResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .userName(user.getName())
                .emailVerification(user.isEmailVerification())
                .role(user.getRole())
                .build();
        return AuthResponse.builder().user(userInfoResponse).refresh_token(refreshToken).access_token(jwtToken).build();
    }
}
