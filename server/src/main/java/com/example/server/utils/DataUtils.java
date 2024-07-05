package com.example.server.utils;

import lombok.Getter;
import org.springframework.stereotype.Component;

@Component
@Getter
public class DataUtils {
    public static final String[] ALLOWED_URLS = {
            "/api/auth/register/**",
            "/api/auth/login/**",
            "/api/auth/googleAuth/**",
            "/api/auth/refreshToken/**",
            "/api/user/checkServer"
    };
    public static final String[] ADMIN_URLS = {
    };
}
