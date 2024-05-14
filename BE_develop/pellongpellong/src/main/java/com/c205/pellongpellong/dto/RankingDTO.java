package com.c205.pellongpellong.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RankingDTO {
    private final Long memberId;
    private final int sumExp;

    @Builder
    public RankingDTO(Long memberId, int sumExp) {
        this.memberId = memberId;
        this.sumExp = sumExp;
    }
}
