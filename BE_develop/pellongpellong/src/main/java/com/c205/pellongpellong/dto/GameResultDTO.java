package com.c205.pellongpellong.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class GameResultDTO {
    private Long guestId;
    private String nickname;
    private String profileImg;
    private Long memberId;
    private int correctCount;
    private int validLifeCount;
    private String alert;
}