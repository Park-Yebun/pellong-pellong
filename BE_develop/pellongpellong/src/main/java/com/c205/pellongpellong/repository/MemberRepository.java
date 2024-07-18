package com.c205.pellongpellong.repository;

import com.c205.pellongpellong.entity.Member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

//    @Query(value = "SELECT nickname FROM Member WHERE memberId = :memberId", nativeQuery = true)
//    Optional<String> getNicknameByMemberId(Long memberId);
//
//
//    Optional<Member> findMemberByMemberId(Long memberId);
//
//    @Query(value = "SELECT profileImg FROM Member WHERE memberId = :memberId", nativeQuery = true)
//    Optional<String> getProfileImgByMemberId(Long memberId);


    // id로 데이터 조회하는 메서드
    Optional<Member> findByMemberId(Long memberId);
}
