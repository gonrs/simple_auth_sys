package com.example.server.modules.user;

import com.example.server.utils.Errors;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

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
        return userRepository.findUserByEmail(email)
                .orElseThrow(() -> new Errors.AuthError("User with this email is not found."));

    }
}
