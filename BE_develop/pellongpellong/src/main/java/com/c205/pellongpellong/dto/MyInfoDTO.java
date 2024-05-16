package com.c205.pellongpellong.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;



@NoArgsConstructor
@Getter
public class MyInfoDTO {
    private String email;
    private String nickname;
    private String profileImg;
    private String tier;
    private Long rank;
    private int sumExp;
    private Long representativeBadgeId;

    public MyInfoDTO(String email, String nickname, String profileImg, String tier, Long rank, int sumExp, Long representativeBadgeId) {
        this.email = email;
        this.nickname = nickname;
        this.profileImg = profileImg;
        this.tier = tier;
        this.rank = rank;
        this.sumExp = sumExp;
        this.representativeBadgeId = representativeBadgeId;

    }

}
