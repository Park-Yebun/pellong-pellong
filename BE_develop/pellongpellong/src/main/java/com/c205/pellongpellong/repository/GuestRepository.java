package com.c205.pellongpellong.repository;


import com.c205.pellongpellong.entity.Guest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GuestRepository extends JpaRepository<Guest, Long> {
//    List<Guest> findByPartyPartyIdAndMemberMemberId(Long partyId, Long memberId);
    List<Guest> findByPartyPartyIdAndMemberId(Long partyId, Long memberId);

}