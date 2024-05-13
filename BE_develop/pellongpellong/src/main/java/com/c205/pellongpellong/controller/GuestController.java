package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.dto.GuestDTO;
import com.c205.pellongpellong.dto.GuestRequest;
import com.c205.pellongpellong.dto.PartyDTO;
import com.c205.pellongpellong.service.GuestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class GuestController {

    private final GuestService guestService;

    @MessageMapping(value = "/party/guest")
    public ResponseEntity<PartyDTO> addGuestToParty(@RequestBody GuestRequest guest) {
            PartyDTO partyDTO = guestService.addGuestToParty(guest);
        return ResponseEntity.ok(partyDTO);
    }

    @GetMapping("/guest/{partyId}")
    public ResponseEntity<List<GuestDTO>> listGuestsByPartyId(@PathVariable Long partyId) {
        List<GuestDTO> guestsDTOs = guestService.listGuestsByPartyId(partyId);
        return ResponseEntity.ok(guestsDTOs);
    }

    @DeleteMapping("/party/{partyId}/guest/{memberId}")
    public ResponseEntity<?> removeGuest(@PathVariable Long partyId, @PathVariable Long memberId) {
        try {
            guestService.removeGuestFromParty(partyId, memberId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}