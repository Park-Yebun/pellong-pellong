package com.c205.pellongpellong.repository;

import com.c205.pellongpellong.dto.PartyDetailDto;
import com.c205.pellongpellong.entity.Party;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PartyRepository extends JpaRepository<Party, Long> {
    @Query("SELECT new com.c205.pellongpellong.dto.PartyDetailDto(p.partyId, p.partyName, m.nickname, m.profileImg) FROM Party p JOIN p.member m")
    List<PartyDetailDto> findAllPartiesWithMemberDetails();

    // kind 값을 기준으로 파티 검색
    List<Party> findByKind(int kind);

    // 특정 회원이 생성한 파티 검색
    Optional<Party> findByMemberId(Long memberId);
}
