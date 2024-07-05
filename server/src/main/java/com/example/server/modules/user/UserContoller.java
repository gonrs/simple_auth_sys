package com.example.server.modules.user;

import com.example.server.modules.user.dto.SubUserResponse;
import com.example.server.modules.user.dto.TokensResponse;
import com.example.server.modules.user.dto.UpdateUserEmailRequest;
import com.example.server.modules.user.dto.UpdateUserPassRequest;
import com.example.server.modules.user.dto.gets.GetUserByEmailRequest;
import com.example.server.modules.user.dto.gets.GetUserByIdRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
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
    public void confirmMail(@PathVariable @Valid @NotEmpty(message = "token can`t be empty") String token) {
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

    @GetMapping("/resetPassword")
    public void resetPassword() {
        userService.resetPassword();
    }

    @PostMapping("/updateEmail")
    public ResponseEntity<TokensResponse> updateEmail(@RequestBody @Valid UpdateUserEmailRequest userData) {
        return ResponseEntity.ok(userService.updateUserEmail(userData.getPassword(), userData.getNewEmail()));
    }

    @GetMapping("/updateRole")
    public void updateRole() {
        userService.updateRole();
    }

    @GetMapping("/updateIsProfileOpen")
    public void updateIsProfileOpen() {
        userService.updateIsProfileOpen();
    }

    @PostMapping("/findUserByEmail")
    public ResponseEntity<SubUserResponse> findUserByEmail(@RequestBody @Valid GetUserByEmailRequest data) {
        return ResponseEntity.ok(userService.findUserByEmail(data.getEmail()));
    }

    @PostMapping("/findUserById")
    public ResponseEntity<SubUserResponse> findUserById(@RequestBody @Valid GetUserByIdRequest data) {
        return ResponseEntity.ok(userService.findUserById(data.getId()));
    }
}
