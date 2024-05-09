package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.dto.GuestDTO;
import com.c205.pellongpellong.service.GuestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class GuestController {

    private final GuestService guestService;

    @PostMapping("/party/guest")
    public ResponseEntity<GuestDTO> addGuestToParty(@RequestParam Long partyId, @RequestParam Long memberId) {
        GuestDTO guestDTO = guestService.addGuestToParty(partyId, memberId);
        return ResponseEntity.ok(guestDTO);
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