package com.example.server.modules.demo;

import com.example.server.utils.Errors;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/demo")
public class DemoController {

    @GetMapping("/security")
    public ResponseEntity<String> securityReq() {
        return ResponseEntity.ok("Hello from security url.");
    }

    @GetMapping("/unSecurity")
    public ResponseEntity<String> unSecurityReq() {
        throw new Errors.ResError("QWE");
    }
}
