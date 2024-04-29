package com.c205.pellongpellong.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class MemberVarient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "memberVarientId", updatable = false)
    private Long memberVarientId;

    @OneToOne
    @JoinColumn(name = "memberId")
    private Member member;

    @Column(name = "tier", nullable = false, columnDefinition = "varchar(100) default '금귤'")
    private String tier;

    @Column(name = "rank", nullable = false)
    private int rank;

    @Column(name = "accDailyQuest", nullable = false, columnDefinition = "int default 0")
    private int accDailyQuest;

    @Column(name = "accLark", nullable = true)
    private int accLark;

    @Column(name = "accOwl", nullable = true)
    private int accOwl;

    @Column(name = "loginedAt", nullable = true)
    private LocalDateTime loginedAt;

    @Builder
    public MemberVarient(Long memberVarientId, Member member, String tier, int rank, int accDailyQuest, int accLark, int accOwl, LocalDateTime loginedAt) {
        this.memberVarientId = memberVarientId;
        this.member = member;
        this.tier = tier;
        this.rank = rank;
        this.accDailyQuest = accDailyQuest;
        this.accLark = accLark;
        this.accOwl = accOwl;
        this.loginedAt = loginedAt;
    }
}
