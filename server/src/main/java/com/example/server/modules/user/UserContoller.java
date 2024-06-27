package com.example.server.modules.user;

import com.example.server.modules.user.dto.UpdateUserEmailRequest;
import com.example.server.modules.user.dto.UpdateUserPassRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
@Validated
public class UserContoller {
    private final UserService userService;

    @GetMapping("/checkServer")
    public void checkServer() {
    }

    @PostMapping("/updateName")
    public void updateName(@RequestBody @Valid String newUserName) {
        userService.updateUserName(newUserName);
    }

    @PostMapping("/updatePassword")
    public void updatePassword(@RequestBody @Valid UpdateUserPassRequest userData) {
        userService.updateUserPass(userData.getOldPassword(), userData.getNewPassword());
    }

    @PostMapping("/updateEmail")
    public void updateEmail(@RequestBody @Valid UpdateUserEmailRequest userData) {
        userService.updateUserEmail(userData.getPassword(), userData.getNewEmail());
    }
}
