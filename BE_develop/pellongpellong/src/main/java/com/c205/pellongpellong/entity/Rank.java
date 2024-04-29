package com.c205.pellongpellong.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Rank {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rankId", updatable = false)
    private Long rankId;

    @OneToOne
    @JoinColumn(name = "memberId")
    private Member member;

    @Column(name = "sumExp", nullable = false)
    private int sumExp;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Builder
    public Rank(Long rankId, Member member, int sumExp, String nickname) {
        this.rankId = rankId;
        this.member = member;
        this.sumExp = sumExp;
        this.nickname = nickname;
    }
}
