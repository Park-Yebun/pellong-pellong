package com.c205.pellongpellong.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberBadge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "memberBadgeId", updatable = false)
    private Long memberBadgeId;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;

    @Column(name = "isAcquired",  nullable = false)
    private boolean isAcquired;

    @Column(name = "isRepresentative",  nullable = false)
    private boolean isRepresentative;
}
