package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.dto.PartyDTO;
import com.c205.pellongpellong.entity.Party;
import com.c205.pellongpellong.repository.MemberRepository;
import com.c205.pellongpellong.service.PartyService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



@RestController
@RequiredArgsConstructor
public class PartyController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private final PartyService partyService;
    private final MemberRepository memberRepository;
    private static final Logger logger = LoggerFactory.getLogger(PartyController.class);


    @PostMapping("/party/create/{memberId}")
    public ResponseEntity<?> createParty(@PathVariable Long memberId, @RequestBody Party party) {
        // 해당 멤버가 이미 파티를 생성했는지 확인
        Optional<Party> existingParty = partyService.findPartyByMemberId(memberId);
        if (existingParty.isPresent()) {
            return ResponseEntity.badRequest().body("방을 이미 만드셨습니다.");
        }

        // 파티 생성
        party.setMember(memberRepository.findById(memberId).orElseThrow(() -> new RuntimeException("멤버 값을 찾을 수 없습니다.")));
        Party newParty = partyService.createParty(party);

        //파티id만 반환
        Map<String, Long> result = new HashMap<>();
        result.put("partyId", newParty.getPartyId());
        return ResponseEntity.ok(result);
    }



    @GetMapping("/party")
    public ResponseEntity<List<PartyDTO>> getAllParties() {
        List<PartyDTO> partyDTOs = partyService.listAllPartiesWithDetails();
        return ResponseEntity.ok(partyDTOs);
    }


    @MessageMapping("/party/delete/{memberId}")
    @SendTo("/topic/party/{partyId}")
    public Map<String, Object> deletePartyByMemberId(@DestinationVariable("memberId") Long memberId) {
        Optional<Party> party = partyService.findPartyByMemberId(memberId);
        if (!party.isPresent()) {
            Map<String, Object> message = new HashMap<>();
            message.put("type", "deleteError");
            return message;
        }
        partyService.deleteParty(party.get().getPartyId());
        Map<String, Object> message = new HashMap<>();
        message.put("type", "delete");
        return message;
    }


    @MessageMapping("/party/{partyId}")
    public void enterUser(@DestinationVariable("partyId") Long partyId) {
        String enterMessage = "대기방에 입장하셨습니다.";
//        logger.info("입장요청 잘 수신함!!");

        // 동적으로 대상 경로를 설정하여 메시지 전송
        messagingTemplate.convertAndSend("/topic/party/" + partyId, enterMessage);
    }

    @MessageMapping("/party/{partyId}/start")
    @SendTo("/topic/party/{partyId}")
    public Map<String, Object> startGame(@DestinationVariable Long partyId) {
        Map<String, Object> message = new HashMap<>();
        message.put("type", "startGame");

        return message;
    }

    @MessageMapping(value = "/party/{partyId}/correct/{memberId}")
    @SendTo("/topic/party/{partyId}")
    public Map<String, Object>  correctMSG(@DestinationVariable("partyId")  Long partyId, @DestinationVariable("memberId")  Long memberId) {
        logger.info("정답 요청 옴");
        Map<String, Object> message = new HashMap<>();
        message.put("type", "correct");
        message.put("memberId", memberId);

        return message;
    }

    @MessageMapping(value = "/party/{partyId}/wrong/{memberId}")
    @SendTo("/topic/party/{partyId}")
    public Map<String, Object> wrongMSG(@DestinationVariable("partyId") Long partyId, @DestinationVariable("memberId") Long memberId) {
        logger.info("오답 요청 옴");
        Map<String, Object> message = new HashMap<>();
        message.put("type", "wrong");
        message.put("memberId", memberId);

        return message;
    }

    @MessageMapping(value = "/party/result")
    @SendTo("/topic/party/{partyId}")
    public Map<String, Object> result() {
        logger.info("퀴즈 종료");
        Map<String, Object> message = new HashMap<>();
        message.put("type", "result");

        return message;
    }

}
