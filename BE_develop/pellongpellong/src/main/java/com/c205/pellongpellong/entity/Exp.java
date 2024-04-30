package com.c205.pellongpellong.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Exp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "expId", updatable = false)
    private Long expId;

    @Column(name = "exp", nullable = false)
    private int exp;

    @Column(name = "expName", nullable = true)
    private String expName;

    @Column(name = "expAt",  nullable = false)
    private LocalDateTime expAt;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;
    @Builder
    public Exp(int exp, String expName, LocalDateTime expAt) {
        this.exp = exp;
        this.expName = expName;
        this.expAt = expAt;
    }

    public Long getMemberId() {
        return member != null ? member.getMemberId() : null;
    }
}
