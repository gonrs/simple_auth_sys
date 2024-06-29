package com.example.server.modules.user;

import com.example.server.utils.Errors;
import com.example.server.utils.JwtService;
import com.example.server.utils.MailSenderService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
            System.out.println("WORKING");
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
        User currentUser = getCurrentUser();
        if (passwordEncoder.matches(oldPassword, currentUser.getPassword())) {
            currentUser.setPassword(passwordEncoder.encode(newPassword));
        } else {
            throw new Errors.ResError("Password is incorrect");
        }
    }

    public boolean isValidEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    public void updateUserEmail(String password, String newEmail) {
//        update user email
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
}
