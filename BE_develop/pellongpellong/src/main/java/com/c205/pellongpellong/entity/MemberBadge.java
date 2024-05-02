package com.c205.pellongpellong.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Setter
@Entity
@Getter
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

    public Long getBadgeId() {
        return badge.getBadgeId(); // 이렇게 수정해야할 수 있음
    }

}
