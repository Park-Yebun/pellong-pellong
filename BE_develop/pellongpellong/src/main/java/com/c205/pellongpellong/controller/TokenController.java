package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.dto.AccessTokenDTO;
import com.c205.pellongpellong.dto.RefreshTokenDTO;
import com.c205.pellongpellong.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class TokenController {
    private final TokenService tokenService;

    @PostMapping("/token")
    public ResponseEntity<AccessTokenDTO> createNewAccessToken (Authentication authentication, @RequestBody RefreshTokenDTO dto) {
        String newAccessToken = tokenService.createNewAccessToken(authentication, dto.getRefreshToken());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new AccessTokenDTO(newAccessToken));
    }
}
