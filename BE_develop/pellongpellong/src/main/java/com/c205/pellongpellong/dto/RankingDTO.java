package com.c205.pellongpellong.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

//@Setter
//@Getter
//public class RankingDTO {
//    private final Long memberId;
//    private final int sumExp;
//
//    @Builder
//    public RankingDTO(Long memberId, int sumExp) {
//        this.memberId = memberId;
//        this.sumExp = sumExp;
//    }
//}

@Getter
public class RankingDTO {
    private final Long memberId;
    private final String nickName;
    private final int sumExp;

    @Builder
    public RankingDTO(Long memberId,  String nickName, int sumExp) {
        this.memberId = memberId;
        this.nickName = nickName;
        this.sumExp = sumExp;
    }
}
