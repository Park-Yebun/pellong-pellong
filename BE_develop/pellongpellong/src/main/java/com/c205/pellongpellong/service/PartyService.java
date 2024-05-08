package com.c205.pellongpellong.service;

import com.c205.pellongpellong.dto.GuestDTO;
import com.c205.pellongpellong.dto.PartyDTO;
import com.c205.pellongpellong.dto.PartyDetailDTO;
import com.c205.pellongpellong.entity.Member;
import com.c205.pellongpellong.entity.Party;
import com.c205.pellongpellong.repository.PartyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class PartyService {
    @Autowired
    private PartyRepository partyRepository;

    public Optional<Party> findPartyByMemberId(Long memberId) {
        return partyRepository.findById(memberId);
    }

    public Party createParty(Party party) {
        return partyRepository.save(party);
    }

    public void deleteParty(Long partyId) {
        partyRepository.deleteById(partyId);
    }

    public List<PartyDTO> listAllPartiesWithDetails() {
        List<Party> parties = partyRepository.findAll();
            return parties.stream().map(party -> {
                Member member = party.getMember(); // 멤버 정보 접근은 Lazy 초기화 필요
                return new PartyDTO(
                        party.getPartyId(),
                        party.getPartyName(),
                        party.getKind(),
                        party.getPo(),
                        party.getTo(),
                        party.getIsPublic(),
                        member.getNickname(),
                        member.getProfileImg()
                );
            }).collect(Collectors.toList());
    }
    public PartyDetailDTO getPartyDetail(Long partyId) {
        Party party = partyRepository.findById(partyId).orElseThrow(() -> new RuntimeException("Party not found"));
        List<GuestDTO> guestDTOs = party.getGuests().stream()
                .map(guest -> new GuestDTO(guest.getGuestId(), guest.getMember().getNickname(), guest.getMember().getProfileImg()))
                .collect(Collectors.toList());

        return new PartyDetailDTO(
                party.getPartyId(),
                party.getPartyName(),
                party.getKind(),
                party.getPo(),
                party.getTo(),
                party.getIsPublic(),
                party.getMember().getNickname(),
                party.getMember().getProfileImg(),
                guestDTOs
        );
    }
}