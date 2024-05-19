package com.c205.pellongpellong.dto;

import lombok.Getter;

@Getter
public class JejuProverbDTO {
    private final Long jejuProverbId;
    private final String pbStandard;
    private final String pbJeju;

    public JejuProverbDTO(Long jejuProverbId, String pbStandard, String pbJeju) {
        this.jejuProverbId = jejuProverbId;
        this.pbStandard = pbStandard;
        this.pbJeju = pbJeju;
    }
}
