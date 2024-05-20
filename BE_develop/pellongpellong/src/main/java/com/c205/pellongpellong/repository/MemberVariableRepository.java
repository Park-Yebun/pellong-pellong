package com.c205.pellongpellong.repository;

import com.c205.pellongpellong.entity.MemberBadge;
import com.c205.pellongpellong.entity.MemberVariable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface MemberVariableRepository extends JpaRepository<MemberVariable, Long> {
    Optional<MemberVariable> findByMember_MemberId(Long memberId);
}
