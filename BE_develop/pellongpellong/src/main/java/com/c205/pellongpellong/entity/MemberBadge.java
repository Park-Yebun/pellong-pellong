package com.c205.pellongpellong.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
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

    @ManyToOne
    @JoinColumn(name = "badgeId")
    private Badge badge;

    @Column(name = "isAcquired",  nullable = false)
    private boolean isAcquired;

    @Column(name = "isRepresentative",  nullable = false)
    private boolean isRepresentative;

    @Builder
    public MemberBadge(Long memberBadgeId, Member member, Badge badge, boolean isAcquired, boolean isRepresentative) {
        this.memberBadgeId = memberBadgeId;
        this.member = member;
        this.badge = badge;
        this.isAcquired = isAcquired;
        this.isRepresentative = isRepresentative;
    }
}
