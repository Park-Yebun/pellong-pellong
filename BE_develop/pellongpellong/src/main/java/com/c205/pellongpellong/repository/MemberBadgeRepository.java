package com.c205.pellongpellong.repository;

import com.c205.pellongpellong.entity.MemberBadge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberBadgeRepository extends JpaRepository<MemberBadge, Long> {
    MemberBadge findByMemberMemberIdAndIsRepresentative(Long memberId, boolean isRepresentative);
}
