package com.c205.pellongpellong.repository;

import com.c205.pellongpellong.entity.MemberBadge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberBadgeRepository extends JpaRepository<MemberBadge, Long> {
    MemberBadge findByMemberMemberIdAndIsRepresentative(Long memberId, boolean isRepresentative);
    List<MemberBadge> findByMemberMemberId(Long memberId);
}
