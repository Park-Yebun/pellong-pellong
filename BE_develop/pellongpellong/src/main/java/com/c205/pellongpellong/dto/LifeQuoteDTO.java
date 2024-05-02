package com.c205.pellongpellong.dto;

import lombok.Getter;

@Getter
public class LifeQuoteDTO {
    private Long lifeQuoteId;
    private String lifeQuoteContent;

    public LifeQuoteDTO(Long lifeQuoteId, String lifeQuoteContent) {
        this.lifeQuoteId = lifeQuoteId;
        this.lifeQuoteContent = lifeQuoteContent;
    }
}
