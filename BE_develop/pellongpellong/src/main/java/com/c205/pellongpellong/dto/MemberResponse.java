package com.c205.pellongpellong.dto;

import com.c205.pellongpellong.entity.Member;
import lombok.Getter;

@Getter
public class MemberResponse {

    private final String email;
    private final String nickname;
    private final String profileImg;

    public MemberResponse(Member member) {
        this.email = member.getEmail();
        this.nickname = member.getNickname();
        this.profileImg = member.getProfileImg();
    }

}
