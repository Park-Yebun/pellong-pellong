package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.dto.PartyDetailDto;
import com.c205.pellongpellong.entity.Party;
import com.c205.pellongpellong.service.PartyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/parties")
public class PartyController {

    @Autowired
    private PartyService partyService;

    // 모든 파티 상세 정보 조회
    @GetMapping
    public ResponseEntity<List<PartyDetailDto>> getAllParties() {
        List<PartyDetailDto> parties = partyService.getAllPartiesWithDetails();
        return ResponseEntity.ok(parties);
    }

    // 특정 종류(kind)의 파티 조회
    @GetMapping("/kind/{kind}")
    public ResponseEntity<List<Party>> getPartiesByKind(@PathVariable int kind) {
        List<Party> parties = partyService.getPartiesByKind(kind);
        return ResponseEntity.ok(parties);
    }

    // 특정 파티 조회
    @GetMapping("/{partyId}")
    public ResponseEntity<Party> getPartyById(@PathVariable Long partyId) {
        Party party = partyService.getPartyById(partyId)
                .orElseThrow(() -> new RuntimeException("Party not found with id: " + partyId));
        return ResponseEntity.ok(party);
    }

    // 파티 생성
    @PostMapping
    public ResponseEntity<Party> createParty(@RequestBody Party party, @RequestParam Long memberId) {
        Party createdParty = partyService.createParty(party, memberId);
        return ResponseEntity.status(201).body(createdParty);
    }

    // 파티 수정
    @PutMapping("/{partyId}")
    public ResponseEntity<Party> updateParty(@PathVariable Long partyId, @RequestBody Party partyDetails) {
        Party updatedParty = partyService.updateParty(partyId, partyDetails);
        return ResponseEntity.ok(updatedParty);
    }

    // 파티 삭제
    @DeleteMapping("/{partyId}")
    public ResponseEntity<Void> deleteParty(@PathVariable Long partyId, @RequestParam Long memberId) {
        partyService.deleteParty(partyId, memberId);
        return ResponseEntity.ok().build();
    }
}