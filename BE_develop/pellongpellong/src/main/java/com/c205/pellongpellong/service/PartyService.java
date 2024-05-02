package com.c205.pellongpellong.service;

import com.c205.pellongpellong.repository.PartyRepository;
import com.c205.pellongpellong.dto.PartyDetailDto;
import com.c205.pellongpellong.entity.Party;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PartyService {

    @Autowired
    private PartyRepository partyRepository;

    public List<PartyDetailDto> getAllPartiesWithDetails() {
        return partyRepository.findAllPartiesWithMemberDetails();
    }

    public List<Party> getPartiesByKind(int kind) {
        return partyRepository.findByKind(kind);
    }

    public Optional<Party> getPartyById(Long partyId) {
        return partyRepository.findById(partyId);
    }

    //생성
    public Party createParty(Party party, Long memberId) {
        // 사용자가 이미 파티를 가지고 있는지 확인
        Optional<Party> existingParty = partyRepository.findByMemberMemberId(memberId);
        if (existingParty.isPresent()) {
            throw new IllegalStateException("이미 파티를 생성하셨습니다.");
        }
        return partyRepository.save(party);
    }
    //수정
    public Party updateParty(Long partyId, Party partyDetails) {
        Party existingParty = partyRepository.findById(partyId)
                .orElseThrow(() -> new IllegalStateException("Party not found with id: " + partyId));

        existingParty.setPartyName(partyDetails.getPartyName());
        existingParty.setPassword(partyDetails.getPassword()); // 비밀번호 변경 로직은 보안을 고려해야 함
        existingParty.setKind(partyDetails.getKind());
        existingParty.setPo(partyDetails.getPo());
        existingParty.setTo(partyDetails.getTo());
        existingParty.setPublic(partyDetails.isPublic());
        existingParty.setMember(partyDetails.getMember()); // 멤버 변경 로직은 권한 검사가 필요

        return partyRepository.save(existingParty);
    }

    //삭제
    public void deleteParty(Long partyId, Long memberId) {
        Party party = partyRepository.findById(partyId)
                .orElseThrow(() -> new IllegalStateException("파티를 찾을 수 없습니다."));

        if (!party.getMember().getMemberId().equals(memberId)) {
            throw new IllegalStateException("파티방을 만든 사용자와 다릅니다.");
        }

        partyRepository.deleteById(partyId);
    }
}