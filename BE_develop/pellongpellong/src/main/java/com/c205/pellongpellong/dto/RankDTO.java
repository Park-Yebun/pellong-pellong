package com.c205.pellongpellong.dto;

import lombok.*;
@Getter
public class RankDTO {
    private final Long rankId;
    private final Long memberId;
    private final int sumExp;
    private final String nickname;

    @Builder
    public RankDTO(Long rankId, Long memberId, int sumExp, String nickname) {
        this.rankId = rankId;
        this.memberId = memberId;
        this.sumExp = sumExp;
        this.nickname = nickname;
    }
}
