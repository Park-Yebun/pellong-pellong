package com.c205.pellongpellong.entity;

import com.c205.pellongpellong.dto.DailyQuestDTO;
import jakarta.persistence.*;
import lombok.*;

@Entity  // 엔티티로 지정, 테이블 "DailyQuest"과 매핑
@NoArgsConstructor(access = AccessLevel.PROTECTED)  // 기본 생성자
@AllArgsConstructor  // 모든 필드 값을 받는 생성자, 클래스의 모든 필드를 한번에 초기화
@Getter
@Setter  // DailyQuest의 일부 필드를 수정될 수 있어야 한다.
@Table(name = "DailyQuest")
public class DailyQuest {
    @Id // id 필드를 기본키로 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본키 생성을 데이터베이스에 위임, autoincrement
    @Column(name = "dailyQuestId", updatable = false) // 데이터베이스의 dailyQuestId 컬럼과 매핑
    private Long dailyQuestId;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "memberId")
    private Member member;

    @Column(name = "dailyExp", nullable = false)
    private int dailyExp;

    @Column(name = "isPassed", nullable = false)
    private boolean isPassed;

    @Column(name = "isShared", nullable = false)
    private boolean isShared = false;

    @Column(name = "isAccomplished", nullable = false)
    private boolean isAccomplished = false;

    @Builder
    public DailyQuest(Member member, int dailyExp, boolean isPassed, boolean isShared, boolean isAccomplished) {
        this.member = member;
        this.dailyExp = dailyExp;
        this.isPassed = isPassed;
        this.isShared = isShared;
        this.isAccomplished = isAccomplished;
    }

    public DailyQuestDTO of(DailyQuest dailyQuest) {
        return DailyQuestDTO.builder()
                .dailyQuestId(dailyQuest.getDailyQuestId())
                .memberId(dailyQuest.getMember().getMemberId())
                .dailyExp(dailyQuest.getDailyExp())
                .isPassed(dailyQuest.isPassed())
                .isShared(dailyQuest.isShared())
                .isAccomplished(dailyQuest.isAccomplished())
                .build();
    }
}
