package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.dto.GuestDTO;
import com.c205.pellongpellong.dto.GuestRequest;
import com.c205.pellongpellong.dto.PartyDTO;
import com.c205.pellongpellong.dto.PartyDetailDTO;
import com.c205.pellongpellong.service.GuestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class GuestController {

    private final GuestService guestService;
    private static final Logger logger = LoggerFactory.getLogger(PartyController.class);

    @MessageMapping(value = "/party/guest")
    public ResponseEntity<PartyDetailDTO> addGuestToParty(@RequestBody GuestRequest guest) {
            PartyDetailDTO partydetail = guestService.addGuestToParty(guest);
        return ResponseEntity.ok(partydetail);
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