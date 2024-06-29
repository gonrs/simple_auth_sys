package com.example.server.modules.user;

import com.example.server.modules.user.dto.UpdateUserEmailRequest;
import com.example.server.modules.user.dto.UpdateUserPassRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

    @DeleteMapping("/delete")
    public void delete() {
        userService.deleteUser();
    }

    @GetMapping("/sendConfirmMail")
    public void sendConfirmMail() {
        userService.sendConfirmMail();
    }

    @GetMapping("/confirmMail/{token}")
    public void confirmMail(@PathVariable @Valid @NotEmpty(message = "token can`t be empty")  String token) {
        userService.confirmMail(token);
    }

    @GetMapping("/updateName/{newUserName}")
    public void updateName(@PathVariable String newUserName) {
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
