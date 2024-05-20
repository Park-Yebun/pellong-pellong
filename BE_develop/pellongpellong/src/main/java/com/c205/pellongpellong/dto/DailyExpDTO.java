package com.c205.pellongpellong.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@NoArgsConstructor
public class DailyExpDTO {
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private int dailyExp;

    public DailyExpDTO(Object[] dailyExp) {
        this.date = (Date) dailyExp[0];
        BigDecimal bigDecimalExp = (BigDecimal) dailyExp[1];
        this.dailyExp = bigDecimalExp.intValue();
    }
}
