package com.c205.pellongpellong.dto;

import com.c205.pellongpellong.domain.Member;
import lombok.Getter;

@Getter
public class UserResponse {

    private final String email;
    private final String nickname;
    private final String profileImg;

    public UserResponse(Member user) {
        this.email = user.getEmail();
        this.nickname = user.getNickname();
        this.profileImg = user.getProfileImg();
    }

}
