package com.example.server.config;

import com.example.server.utils.DataUtils;
import com.example.server.utils.errors.Errors;
import com.example.server.utils.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        String requestURI = request.getRequestURI();
        if (authHeader == null || !authHeader.startsWith("Bearer ") || Arrays.stream(DataUtils.ALLOWED_URLS).anyMatch(s -> s.startsWith(requestURI))) {
            filterChain.doFilter(request, response);
            return;
        }
        jwt = authHeader.substring(7);
        var claims = jwtService.extractAllClaims(jwt);
        if (claims.isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }
        if (!claims.get().get("type").equals("access")) {
            filterChain.doFilter(request, response);
            return;
        }

        userEmail = jwtService.extractUserEmail(jwt).orElseThrow(() -> new Errors.AuthError("Invalid token."));
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        } else {
            throw new Errors.AuthError("Token is invalid.");
        }
        filterChain.doFilter(request, response);
    }
}
