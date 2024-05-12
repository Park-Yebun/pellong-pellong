package com.c205.pellongpellong.dto;

import lombok.Getter;

@Getter
public class MyInfoVarDTO {
    private String tier;
    private Long rank;
    public MyInfoVarDTO(String tier, Long rank) {
        this.tier = tier;
        this.rank = rank;
    }
}