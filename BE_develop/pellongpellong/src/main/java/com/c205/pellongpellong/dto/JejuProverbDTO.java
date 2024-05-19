package com.c205.pellongpellong.dto;

import lombok.Getter;

@Getter
public class JejuProverbDTO {
    private final Long jejuProverbId;
    private final String pbJeju;
    private final String pbStandard;

    public JejuProverbDTO(Long jejuProverbId, String pbJeju, String pbStandard) {
        this.jejuProverbId = jejuProverbId;
        this.pbJeju = pbJeju;
        this.pbStandard = pbStandard;
    }
}
