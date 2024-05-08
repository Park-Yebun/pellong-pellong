package com.c205.pellongpellong.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GuestDTO {
    private Long guestId;
    private String nickname;
    private String profileImg;

    public GuestDTO(Long guestId, String nickname, String profileImg) {
        this.guestId = guestId;
        this.nickname = nickname;
        this.profileImg = profileImg;
    }
}