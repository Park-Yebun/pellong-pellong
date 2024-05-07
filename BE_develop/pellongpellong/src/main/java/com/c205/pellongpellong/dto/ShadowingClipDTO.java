package com.c205.pellongpellong.dto;  // step3. DTO 만들기

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

//@NoArgsConstructor  // 기본 생성자 추가
//@AllArgsConstructor  // 모든 필드 값을 파라미터로 받는 생성자 추가
@Getter
public class ShadowingClipDTO {
    private final Long shadowingClipId;
    private final String clipTitle;
    private final String clipThumbnail;
    private final String clipUrl;

    @Builder
    public ShadowingClipDTO(Long shadowingClipId, String clipTitle, String clipThumbnail, String clipUrl) {
        this.shadowingClipId = shadowingClipId;
        this.clipTitle = clipTitle;
        this.clipThumbnail = clipThumbnail;
        this.clipUrl = clipUrl;
    }
}
