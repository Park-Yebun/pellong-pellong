package com.c205.pellongpellong.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class LoginAtDTO {
    private LocalDateTime loginedAt;

    public LoginAtDTO(LocalDateTime loginedAt){
        this.loginedAt = loginedAt;
    }

}
