package com.c205.pellongpellong.dto;


import com.c205.pellongpellong.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddMemberRequest {
    private String email;
    private String nickname;
    private String profileImg;

    public Member toEntity() {
        return Member.builder()
                .email(email)
                .nickname(nickname)
                .profileImg(profileImg)
                .build();
    }
}
