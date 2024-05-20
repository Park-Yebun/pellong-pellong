package com.c205.pellongpellong.service;

import com.c205.pellongpellong.controller.PartyController;
import com.c205.pellongpellong.dto.GuestDTO;
import com.c205.pellongpellong.dto.GuestRequest;
import com.c205.pellongpellong.dto.PartyDetailDTO;
import com.c205.pellongpellong.entity.Guest;
import com.c205.pellongpellong.entity.Member;
import com.c205.pellongpellong.entity.Party;
import com.c205.pellongpellong.repository.GuestRepository;
import com.c205.pellongpellong.repository.MemberRepository;
import com.c205.pellongpellong.repository.PartyRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
    private static final Logger logger = LoggerFactory.getLogger(PartyController.class);

    // 웹소켓 적용
    @Transactional
    public PartyDetailDTO addGuestToParty(GuestRequest user) {
        logger.info("입장요청 잘 수신함");
        Party party = partyRepository.findById(user.getPartyId()).orElseThrow(() -> new RuntimeException("파티id를 찾을 수 없어요"));
        Member member = memberRepository.findById(user.getMemberId()).orElseThrow(() -> new RuntimeException("회원id을 찾을 수 없어요"));

//        List<Guest> existingGuests = guestRepository.findByPartyPartyIdAndMemberMemberId(user.getPartyId(), user.getMemberId());
        List<Guest> existingGuests = guestRepository.findByPartyPartyIdAndMemberId(user.getPartyId(), user.getMemberId());
        if (!existingGuests.isEmpty()) {
            throw new IllegalStateException("해당 회원은 이미 파티에 참여 중입니다.");
        }

        if (party.getPo() >= party.getTo()) {
            throw new IllegalStateException("방이 가득 찼어요.");
        }
        Guest guest = new Guest();
//        guest.setMember(member);
        guest.setMemberId(member.getMemberId());
        guest.setParty(party);
        guest = guestRepository.save(guest);

        party.setPo(party.getPo() + 1);
        partyRepository.save(party);

        List<GuestDTO> guestDTOs = party.getGuests().stream()
//                .map(g -> new GuestDTO(g.getGuestId(), g.getMember().getNickname(), g.getMember().getProfileImg()))
                .map(g -> new GuestDTO(g.getGuestId(),
                        memberRepository.getNicknameByMemberId(g.getMemberId()).orElseThrow(),
                        memberRepository.findMemberByMemberId(g.getMemberId()).orElseThrow().getProfileImg(),
                        g.getMemberId()))
                .collect(Collectors.toList());

        PartyDetailDTO partydetail = new PartyDetailDTO(
                party.getPartyId(),
                party.getPartyName(),
                party.getKind(),
                party.getPo(),
                party.getTo(),
                party.getIsPublic(),
//                member.getMemberId(),
                party.getMember().getMemberId(),
                guestDTOs);
        
        // 웹소켓 송신 메세지 객체 타입으로 만들어서 보내주기
//        Map<String, Object> message = new HashMap<>();
//        message.put("type", "updateData");
//        message.put("partyDetail", partydetail);
//        try {
//            String jsonMessage = new ObjectMapper().writeValueAsString(message);
//            messagingTemplate.convertAndSend("/topic/party/" + party.getPartyId(), jsonMessage);
//        } catch (JsonProcessingException e) {
//            // 로깅 및 오류 처리
//            logger.error("JSON 직렬화 오류", e);
//        }
        return partydetail;
    }

    public List<GuestDTO> listGuestsByPartyId(Long partyId) {
        return guestRepository.findAll().stream()
                .filter(guest -> guest.getParty().getPartyId().equals(partyId))
//                .map(guest -> new GuestDTO(guest.getGuestId(), guest.getMember().getNickname(), guest.getMember().getProfileImg()))
                .map(g -> new GuestDTO(g.getGuestId(),
                        memberRepository.getNicknameByMemberId(g.getMemberId()).orElseThrow(),
                        memberRepository.findMemberByMemberId(g.getMemberId()).orElseThrow().getProfileImg(),
                        g.getMemberId()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void removeGuestFromParty(GuestRequest user) {
//        List<Guest> guests = guestRepository.findByPartyPartyIdAndMemberMemberId(user.getPartyId(), user.getMemberId());
        List<Guest> guests = guestRepository.findByPartyPartyIdAndMemberId(user.getPartyId(), user.getMemberId());
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

        // 업데이트된 파티 테이블 정보 가져오기
        List<GuestDTO> guestDTOs = party.getGuests().stream()
                .map(g -> new GuestDTO(g.getGuestId(),
                        memberRepository.getNicknameByMemberId(g.getMemberId()).orElseThrow(),
                        memberRepository.findMemberByMemberId(g.getMemberId()).orElseThrow().getProfileImg(),
                                g.getMemberId()))
                .collect(Collectors.toList());

        PartyDetailDTO partydetail = new PartyDetailDTO(
                party.getPartyId(),
                party.getPartyName(),
                party.getKind(),
                party.getPo(),
                party.getTo(),
                party.getIsPublic(),
                party.getMember().getMemberId(),
                guestDTOs);

        // 웹소켓 송신 메세지 객체 타입으로 만들어서 보내주기
        Map<String, Object> message = new HashMap<>();
        message.put("type", "updateData");
        message.put("partyDetail", partydetail);
        try {
            String jsonMessage = new ObjectMapper().writeValueAsString(message);
            messagingTemplate.convertAndSend("/topic/party/" + party.getPartyId(), jsonMessage);
            logger.info("유저 퇴장 완료.");
        } catch (JsonProcessingException e) {
            // 로깅 및 오류 처리
            logger.error("JSON 직렬화 오류", e);
        }
    }

}