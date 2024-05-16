package com.c205.pellongpellong.service;

import com.c205.pellongpellong.dto.GuestDTO;
import com.c205.pellongpellong.dto.GuestRequest;
import com.c205.pellongpellong.dto.PartyDTO;
import com.c205.pellongpellong.dto.PartyDetailDTO;
import com.c205.pellongpellong.entity.Guest;
import com.c205.pellongpellong.entity.Member;
import com.c205.pellongpellong.entity.Party;
import com.c205.pellongpellong.repository.GuestRepository;
import com.c205.pellongpellong.repository.MemberRepository;
import com.c205.pellongpellong.repository.PartyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // 웹소켓 적용
    @Transactional
    public PartyDetailDTO addGuestToParty(GuestRequest user) {
        Party party = partyRepository.findById(user.getPartyId()).orElseThrow(() -> new RuntimeException("파티id를 찾을 수 없어요"));
        Member member = memberRepository.findById(user.getMemberId()).orElseThrow(() -> new RuntimeException("회원id을 찾을 수 없어요"));

        List<Guest> existingGuests = guestRepository.findByPartyPartyIdAndMemberMemberId(user.getPartyId(), user.getMemberId());
        if (!existingGuests.isEmpty()) {
            throw new IllegalStateException("해당 회원은 이미 파티에 참여 중입니다.");
        }

        if (party.getPo() >= party.getTo()) {
            throw new IllegalStateException("방이 가득 찼어요.");
        }
        Guest guest = new Guest();
        guest.setMember(member);
        guest.setParty(party);
        guest = guestRepository.save(guest);

        party.setPo(party.getPo() + 1);
        partyRepository.save(party);

        List<GuestDTO> guestDTOs = party.getGuests().stream()
                .map(g -> new GuestDTO(g.getGuestId(), g.getMember().getNickname(), g.getMember().getProfileImg()))
                .collect(Collectors.toList());

        PartyDetailDTO partydetail = new PartyDetailDTO(
                party.getPartyId(),
                party.getPartyName(),
                party.getKind(),
                party.getPo(),
                party.getTo(),
                party.getIsPublic(),
                member.getMemberId(),
                guestDTOs);
        messagingTemplate.convertAndSend("/topic/party/" + party.getPartyId(), partydetail);
        return partydetail;
    }

    public List<GuestDTO> listGuestsByPartyId(Long partyId) {
        return guestRepository.findAll().stream()
                .filter(guest -> guest.getParty().getPartyId().equals(partyId))
                .map(guest -> new GuestDTO(guest.getGuestId(), guest.getMember().getNickname(), guest.getMember().getProfileImg()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void removeGuestFromParty(GuestRequest user) {
        List<Guest> guests = guestRepository.findByPartyPartyIdAndMemberMemberId(user.getPartyId(), user.getMemberId());
        if (guests.isEmpty()) {
            throw new RuntimeException("해당 파티의 파티원을 찾을 수 없어요");
        }
        Guest guest = guests.get(0); // 가정: 하나의 파티에 같은 회원이 여러 번 등록되지 않음
        Party party = guest.getParty();
        if (party.getPo() > 0) {
            party.setPo(party.getPo() - 1);
        }
        partyRepository.save(party);
        guestRepository.delete(guest);
        messagingTemplate.convertAndSend("/topic/party/" + user.getPartyId(), "유저가 퇴장했습니다.");
    }

}