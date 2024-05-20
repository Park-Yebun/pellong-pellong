package com.c205.pellongpellong.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ExpComparisonRequest {
    private Long memberId;

    public ExpComparisonRequest(Long memberId) {
        this.memberId = memberId;
    }
}
