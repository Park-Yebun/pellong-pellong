package com.c205.pellongpellong.dto;

import lombok.Getter;

@Getter
public class ProfileRankDTO {
    private int sumExp;

    public ProfileRankDTO(int sumExp) {
        this.sumExp = sumExp;
    }
}
