package com.c205.pellongpellong.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
public class MemberVariable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "memberVariableId", updatable = false)
    private Long memberVariableId;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "memberId")
    private Member member;

    @Column(name = "tier", nullable = false, columnDefinition = "varchar(100) default '금귤'")
    private String tier;

    @Column(name = "`rank`", nullable = false)
    private Long rank;

    @Column(name = "accDailyQuest", nullable = false, columnDefinition = "int default 0")
    private int accDailyQuest;

    @Column(name = "accLark", nullable = true)
    private int accLark;

    @Column(name = "accOwl", nullable = true)
    private int accOwl;

    @Column(name = "loginedAt", nullable = true)
    private LocalDateTime loginedAt;

    @Builder
    public MemberVariable(Long memberVariableId, Member member, String tier, Long rank, int accDailyQuest, int accLark, int accOwl, LocalDateTime loginedAt) {
        this.memberVariableId = memberVariableId;
        this.member = member;
        this.tier = tier;
        this.rank = rank;
        this.accDailyQuest = accDailyQuest;
        this.accLark = accLark;
        this.accOwl = accOwl;
        this.loginedAt = loginedAt;
    }
}
