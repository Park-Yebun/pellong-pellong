package com.c205.pellongpellong.entity;  // step1. 엔티티 만들기

import com.c205.pellongpellong.dto.ShadowingClipDTO;
import jakarta.persistence.*;
import lombok.*;
@Getter //
@Entity(name = "ShadowingClip") // 엔티티로 지정, 테이블 "ShadowingClip"과 매핑
@NoArgsConstructor(access = AccessLevel.PROTECTED)  // 기본 생성자
@AllArgsConstructor // 모든 필드 값을 받는 생성자, 클래스의 모든 필드를 한번에 초기화
public class ShadowingClip {
    @Id // id 필드를 기본키로 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본키 생성을 데이터베이스에 위임, autoincrement
    @Column(name = "shadowingClipId") // 컬럼으로 지정
    private Long shadowingClipId;

    @Column(name = "clipTitle", length = 255, nullable = false) // 컬럼으로 지정, 길이 255, null 허용 안함
    private String clipTitle;

    @Column(name = "clipThumbnail", length = 255, nullable = false) // 컬럼으로 지정, 길이 255, null 허용 안함
    private String clipThumbnail;

    @Column(name = "clipUrl", length = 255, nullable = false) // 컬럼으로 지정, 길이 255, null 허용 안함
    private String clipUrl;

    @Builder // 생성자 위에 입력하면 빌더패턴으로 객체생성가능
    public ShadowingClip(String clipTitle, String clipThumbnail, String clipUrl) {
        this.clipTitle = clipTitle;
        this.clipThumbnail = clipThumbnail;
        this.clipUrl = clipUrl;
    }

    public ShadowingClipDTO of(ShadowingClip shadowingClip) {
        return ShadowingClipDTO.builder()
                .shadowingClipId(shadowingClip.getShadowingClipId())
                .clipTitle(shadowingClip.getClipTitle())
                .clipThumbnail(shadowingClip.getClipTitle())
                .clipUrl(shadowingClip.getClipUrl())
                .build();
    }

}
