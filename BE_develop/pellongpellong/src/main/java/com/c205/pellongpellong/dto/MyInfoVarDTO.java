package com.c205.pellongpellong.dto;

import lombok.Getter;

@Getter
public class MyInfoVarDTO {
    private String tier;
    private int rank;
    public MyInfoVarDTO(String tier, int rank) {
        this.tier = tier;
        this.rank = rank;
    }
}