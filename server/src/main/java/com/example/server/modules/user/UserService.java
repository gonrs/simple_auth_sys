package com.example.server.modules.user;

import com.example.server.modules.auth.dto.AuthResponse;
import com.example.server.modules.auth.dto.UserInfoResponse;
import com.example.server.modules.user.dto.TokensResponse;
import com.example.server.utils.Errors;
import com.example.server.utils.JwtService;
import com.example.server.utils.MailSenderService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailSenderService mailSenderService;
    private final JwtService jwtService;

    public User save(User user) {
        return userRepository.save(user);
    }

    public User create(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new Errors.AuthError("User with this email is already exists.");
        } else {
            return save(user);
        }
    }

    public User getCurrentUser() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return getByEmail(userEmail);
    }

    public User getByEmail(String email) {
        return userRepository.findUserByEmail(email).orElseThrow(() -> new Errors.AuthError("User with this email is not found."));
    }

    //    contoller functions
    public void updateUserName(String newUserName) {
        User currentUser = getCurrentUser();
        currentUser.setName(newUserName);
        userRepository.save(currentUser);
    }

    public void updateUserPass(String oldPassword, String newPassword) {
        if (oldPassword.equals(newPassword)) {
            throw new Errors.ResError("The new password must not be equal to the current one");
        }
        User currentUser = getCurrentUser();
        if (passwordEncoder.matches(oldPassword, currentUser.getPassword())) {
            currentUser.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(currentUser);
        } else {
            throw new Errors.ResError("Password is incorrect");
        }
    }

    public boolean isValidEmail(String email) {
        return userRepository.existsByEmail(email);
    }


    @SneakyThrows
    @Transactional
    public void sendConfirmMail() {
        User user = getCurrentUser();
        if (user.isEmailVerification()) {
            throw new Errors.ResError("User email is already verified");
        }
        String confirmedToken = jwtService.generateConfirmToken(user);
        try {
            mailSenderService.sendEmailConfirmedMail(user.getEmail(), confirmedToken);
        } catch (Exception e) {
            throw new Errors.ResError("Something went wrong.");
        }
    }

    public void confirmMail(String token) {
        var claims = jwtService.extractAllClaims(token);
        if (claims.isEmpty()) {
            throw new Errors.ResError("Invalid token");
        }
        User user = getCurrentUser();

        if (!jwtService.isTokenValid(token, user) || !claims.get().get("type").equals("confirm")) {
            throw new Errors.ResError("Invalid token type");
        }
        user.setEmailVerification(true);
        userRepository.save(user);
    }

    public void deleteUser() {
        User user = getCurrentUser();
        userRepository.delete(user);
    }

    public void resetPassword() {
        User user = getCurrentUser();
        String newPassword = generatePassword();
        user.setPassword(passwordEncoder.encode(newPassword));

        String emailBody = "Here is your new auto-generated password: " + newPassword;
        mailSenderService.sendEmail(user.getEmail(), emailBody, "Your auto-generated password");
    }

    public TokensResponse updateUserEmail(String password, String newEmail) {
        User user = getCurrentUser();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new Errors.ResError("Password is incorrect");
        }
        if (!user.isEmailVerification()) {
            throw new Errors.ResError("Email has`t been verified, please confirm your email");
        }
        if (isValidEmail(newEmail)) {
            throw new Errors.ResError("This email is already registered");
        }
        user.setEmail(newEmail);
        user.setEmailVerification(false);
        userRepository.save(user);
//
//        String confirmedToken = jwtService.generateConfirmToken(user);
//        try {
//            mailSenderService.sendEmailConfirmedMail(user.getEmail(), confirmedToken);
//        } catch (Exception e) {
//            throw new Errors.ResError("Something went wrong.");
//        }
//
        //        Generate token
        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        return TokensResponse.builder().access_token(jwtToken).refresh_token(refreshToken).build();
    }

    public String generatePassword() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder();
        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(chars.length());
            password.append(chars.charAt(index));
        }
        return password.toString();
    }

}
