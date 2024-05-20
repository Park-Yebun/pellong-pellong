package com.c205.pellongpellong.dto;

import lombok.Getter;

@Getter
public class MyInfoMemberDTO {
    private String email;
    private String nickname;
    private String profileImg;

    public MyInfoMemberDTO(String email, String nickname, String profileImg) {
        this.email = email;
        this.nickname = nickname;
        this.profileImg = profileImg;
    }
}