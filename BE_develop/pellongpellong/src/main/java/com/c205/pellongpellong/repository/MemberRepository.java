package com.c205.pellongpellong.repository;

import com.c205.pellongpellong.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    @Query(value = "SELECT nickname FROM Member WHERE memberId = :memberId", nativeQuery = true)
    Optional<String> getNicknameByMemberId(Long memberId);

    Optional<Member> findMemberByMemberId(Long memberId);
}
