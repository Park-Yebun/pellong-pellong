package com.c205.pellongpellong.dto;

import com.c205.pellongpellong.entity.DailyQuest;
import lombok.*;
@Getter
//@NoArgsConstructor
//@AllArgsConstructor
public class DailyQuestDTO {
    private final Long dailyQuestId;
    private final Long memberId;
    private final int dailyExp;
    private final boolean isPassed;
    private final boolean isShared;
    private final boolean isAccomplished;

    @Builder
    public DailyQuestDTO(Long dailyQuestId, Long memberId, int dailyExp, boolean isPassed, boolean isShared, boolean isAccomplished) {
        this.dailyQuestId = dailyQuestId;
        this.memberId = memberId;
        this.dailyExp = dailyExp;
        this.isPassed = isPassed;
        this.isShared = isShared;
        this.isAccomplished = isAccomplished;
    }

    public DailyQuest toEntity() {
        return DailyQuest.builder()
                .dailyExp(dailyExp)
                .isPassed(isPassed)
                .isShared(isShared)
                .isAccomplished(isAccomplished)
                .build();
    }


}
