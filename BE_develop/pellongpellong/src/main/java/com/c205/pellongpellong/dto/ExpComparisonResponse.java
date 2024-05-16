package com.c205.pellongpellong.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ExpComparisonResponse {
    private Long memberId;
    private String nickname;
    private List<DailyExpDTO> dailyExpDTOList;

    public ExpComparisonResponse(Long memberId, String nickname, List<DailyExpDTO> dailyExpDTOList) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.dailyExpDTOList = dailyExpDTOList;
    }
}
