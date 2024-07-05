package com.example.server.utils;

import com.example.server.utils.errors.Errors;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Component
public class GoogleAuthStrategy {
    @Value("${application.security.google.client-id}")
    private String googleClientId;

    public String getUserDataByType(String googleCredToken, String type) {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(googleClientId))
                .build();

        GoogleIdToken idToken;
        try {
            idToken = verifier.verify(googleCredToken);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                return (String) payload.get(type);
            } else {
                throw new Errors.ResError("Invalid Google Token");
            }
        } catch (GeneralSecurityException | IOException e) {
            throw new Errors.ResError("Invalid Google Token");
        }
    }
}
