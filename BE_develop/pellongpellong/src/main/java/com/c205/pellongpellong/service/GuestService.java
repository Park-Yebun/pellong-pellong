package com.c205.pellongpellong.service;

import com.c205.pellongpellong.entity.Guest;
import com.c205.pellongpellong.entity.Member;
import com.c205.pellongpellong.entity.Party;
import com.c205.pellongpellong.repository.GuestRepository;
import com.c205.pellongpellong.repository.MemberRepository;
import com.c205.pellongpellong.repository.PartyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GuestService {

    @Autowired
    private GuestRepository guestRepository;
    @Autowired
    private PartyRepository partyRepository;
    @Autowired
    private MemberRepository memberRepository;

    public Guest addGuestToParty(Long partyId, Long memberId) {
        Party party = partyRepository.findById(partyId).orElseThrow(() -> new RuntimeException("Party not found"));
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RuntimeException("Member not found"));

        Guest guest = new Guest();
        guest.setMember(member);
        guest.setParty(party);
        guestRepository.save(guest);

        party.setPo(party.getPo() + 1);
        partyRepository.save(party);

        return guest;
    }

    public List<Guest> listGuestsByPartyId(Long partyId) {
        return guestRepository.findAll().stream()
                .filter(guest -> guest.getParty().getPartyId().equals(partyId))
                .collect(Collectors.toList());
    }
}