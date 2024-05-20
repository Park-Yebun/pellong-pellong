package com.c205.pellongpellong.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LifeQuote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lifeQuoteId", updatable = false)
    private Long lifeQuoteId;

    @Column(name = "lifeQuoteContent", nullable = false)
    private String lifeQuoteContent;


    @Builder
    public LifeQuote(String lifeQuoteContent) {
        this.lifeQuoteContent = lifeQuoteContent;
    }
}
