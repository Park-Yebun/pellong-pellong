package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.dto.PartyDTO;
import com.c205.pellongpellong.dto.PartyDetailDTO;
import com.c205.pellongpellong.entity.Party;
import com.c205.pellongpellong.repository.MemberRepository;
import com.c205.pellongpellong.service.PartyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
public class PartyController {

    private final PartyService partyService;
    private final MemberRepository memberRepository;

    @PostMapping("/party/create/{memberId}")
    public ResponseEntity<?> createParty(@PathVariable Long memberId, @RequestBody Party party) {
        // 해당 멤버가 이미 파티를 생성했는지 확인
        Optional<Party> existingParty = partyService.findPartyByMemberId(memberId);
        if (existingParty.isPresent()) {
            return ResponseEntity.badRequest().body("Error: Member already created a party.");
        }

        // 파티 생성
        party.setMember(memberRepository.findById(memberId).orElseThrow(() -> new RuntimeException("Error: Member not found.")));
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

    @DeleteMapping("/party/delete/{memberId}")
    public ResponseEntity<?> deletePartyByMemberId(@PathVariable Long memberId) {
        Optional<Party> party = partyService.findPartyByMemberId(memberId);
        if (!party.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        partyService.deleteParty(party.get().getPartyId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/party/{partyId}")
    public ResponseEntity<PartyDetailDTO> getPartyDetail(@PathVariable Long partyId) {
        PartyDetailDTO partyDetail = partyService.getPartyDetail(partyId);
        return ResponseEntity.ok(partyDetail);
    }
}