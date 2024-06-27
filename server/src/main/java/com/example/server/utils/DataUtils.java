package com.example.server.utils;

import lombok.Getter;
import org.springframework.stereotype.Component;

@Component
@Getter
public class DataUtils {
    public static final String[] ALLOWED_URLS = {
            "/api/auth/register/**",
            "/api/auth/login/**",
            "/api/auth/refreshToken/**",
            "/api/demo/unSecurity",
            "/api/user/checkServer"
    };
}
