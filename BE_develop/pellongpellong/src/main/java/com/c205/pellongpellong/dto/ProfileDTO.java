package com.c205.pellongpellong.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Getter
public class ProfileDTO {
    private String nickname;
    private String profileImg;
    private String tier;
    private int sumExp;
    private List<ProfileMemberBadgeDTO> badgeArray;

    public ProfileDTO(String nickname, String profileImg, String tier, int sumExp, List<ProfileMemberBadgeDTO> badgeArray){
        this.nickname = nickname;
        this.profileImg = profileImg;
        this.tier = tier;
        this.sumExp = sumExp;
        this.badgeArray = badgeArray;
    }
}
