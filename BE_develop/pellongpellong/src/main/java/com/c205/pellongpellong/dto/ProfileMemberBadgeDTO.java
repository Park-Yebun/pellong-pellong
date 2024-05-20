package com.c205.pellongpellong.dto;

import lombok.Getter;

@Getter
public class ProfileMemberBadgeDTO {
    private Long badgeId;
    private boolean isAcquired;
    private boolean isRepresentative;

    public ProfileMemberBadgeDTO(Long badgeId, boolean isAcquired, boolean isRepresentative){
        this.badgeId = badgeId;
        this.isAcquired = isAcquired;
        this.isRepresentative = isRepresentative;
    }
}
