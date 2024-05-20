package com.c205.pellongpellong.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@NoArgsConstructor
@Getter
public class ExpDTO {
    private Long expId;
    private Long memberId;
    private int exp;
    private String expName;
    private LocalDateTime expAt;

    public ExpDTO(Long expId, Long memberId, int exp, String expName, LocalDateTime expAt){
        this.expId = expId;
        this.memberId = memberId;
        this.exp = exp;
        this.expName = expName;
        this.expAt = expAt;

    }
}
