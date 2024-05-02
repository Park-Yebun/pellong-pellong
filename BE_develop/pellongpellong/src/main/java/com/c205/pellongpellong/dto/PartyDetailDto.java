package com.c205.pellongpellong.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class PartyDetailDto {
    private Long partyId;
    private String partyName;
    private String nickname;
    private String profileImg;

    public PartyDetailDto(Long partyId, String partyName, String nickname, String profileImg) {
        this.partyId = partyId;
        this.partyName = partyName;
        this.nickname = nickname;
        this.profileImg = profileImg;
    }
}
