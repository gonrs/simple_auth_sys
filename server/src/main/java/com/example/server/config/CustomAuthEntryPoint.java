package com.example.server.config;

import com.example.server.utils.errors.Errors;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomAuthEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        int resStatus = response.getStatus();
        response.sendError(HttpStatus.UNAUTHORIZED.value(), String.valueOf(new Errors.ResError(authException != null ? authException.getMessage() : "Unauthorized")));
    }
}
