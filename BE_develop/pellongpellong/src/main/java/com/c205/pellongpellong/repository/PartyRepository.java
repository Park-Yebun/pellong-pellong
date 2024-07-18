package com.c205.pellongpellong.repository;

import com.c205.pellongpellong.entity.Party;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface PartyRepository extends JpaRepository<Party, Long> {
    // 멤버 ID로 생성된 파티 찾기
    Optional<Party> findByMemberMemberId(Long memberId);
//    Optional<Party> findByMemberId(Long memberId);
}