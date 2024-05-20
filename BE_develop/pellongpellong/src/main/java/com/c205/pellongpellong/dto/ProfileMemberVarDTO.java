package com.c205.pellongpellong.dto;

import lombok.Getter;

@Getter
public class ProfileMemberVarDTO {
    private String tier;

    public ProfileMemberVarDTO(String tier) {
        this.tier = tier;
    }
}
