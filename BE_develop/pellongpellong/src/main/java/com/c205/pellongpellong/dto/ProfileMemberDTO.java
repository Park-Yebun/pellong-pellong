package com.c205.pellongpellong.dto;

import lombok.Getter;

@Getter
public class ProfileMemberDTO {
    private String nickname;
    private String profileImg;

    public ProfileMemberDTO(String nickname, String profileImg) {
        this.nickname = nickname;
        this.profileImg = profileImg;
    }
}
