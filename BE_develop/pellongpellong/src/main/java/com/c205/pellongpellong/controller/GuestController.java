package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.dto.GuestDTO;
import com.c205.pellongpellong.dto.GuestRequest;
import com.c205.pellongpellong.dto.PartyDTO;
import com.c205.pellongpellong.dto.PartyDetailDTO;
import com.c205.pellongpellong.service.GuestService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class GuestController {

    private final GuestService guestService;
    private static final Logger logger = LoggerFactory.getLogger(PartyController.class);

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/party/guest/{partyId}")
    @SendTo("/topic/party/{partyId}")
    public Map<String, Object> addGuestToParty(@DestinationVariable long partyId, GuestRequest guest) {
        PartyDetailDTO partydetail = guestService.addGuestToParty(guest);

        // 웹소켓 송신 메세지 객체 타입으로 만들어서 보내주기
        Map<String, Object> message = new HashMap<>();
        message.put("type", "updateData");
        message.put("partyDetail", partydetail);

        return message;
    }

    @GetMapping("/guest/{partyId}")
    public ResponseEntity<List<GuestDTO>> listGuestsByPartyId(@PathVariable Long partyId) {
        List<GuestDTO> guestsDTOs = guestService.listGuestsByPartyId(partyId);
        return ResponseEntity.ok(guestsDTOs);
    }

    @MessageMapping(value = "/party/guest/delete")
    public ResponseEntity<?> removeGuest(@RequestBody GuestRequest guest) {
        try {
            logger.info(guest.getMemberId() + "멤버 아이디 출력");
            guestService.removeGuestFromParty(guest);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}