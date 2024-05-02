package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.dto.*;
import com.c205.pellongpellong.entity.Member;
import com.c205.pellongpellong.entity.MemberBadge;
import com.c205.pellongpellong.repository.MemberBadgeRepository;
import com.c205.pellongpellong.service.MemberBadgeService;
import com.c205.pellongpellong.service.MemberService;
import com.c205.pellongpellong.service.MemberVariableService;
import com.c205.pellongpellong.service.RankService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
//@Slf4j

public class MemberController {

    private final MemberService memberService;

    private final MemberVariableService memberVariableService;

    private final RankService rankService;

    private final MemberBadgeService memberBadgeService;

    private MemberBadgeRepository memberBadgeRepository;

    @Autowired
    public void setMemberBadgeRepository(MemberBadgeRepository memberBadgeRepository) {
        this.memberBadgeRepository = memberBadgeRepository;
    }

    @PostMapping("/members")
    public ResponseEntity<Member> addMember(@RequestBody AddMemberRequest request) {
        Member savedMember = memberService.save(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedMember);

    }

    @GetMapping("/members/{memberId}")
    public MyInfoDTO getMyInfoMember(@PathVariable Long memberId) {
        MyInfoMemberDTO myInfoMemberDTO = memberService.getMyInfoMember(memberId);
        MyInfoVarDTO myInfoVarDTO = memberVariableService.getMyInfoVar(memberId);
        MyInfoRankDTO myInfoRankDTO = rankService.getMyInfoRank(memberId);
        Long representativeBadgeId = memberBadgeService.getRepresentativeBadgeId(memberId);
//        log.info("Email: {}", myInfoMemberDTO.getEmail());
        return new MyInfoDTO(myInfoMemberDTO.getEmail(), myInfoMemberDTO.getNickname(), myInfoMemberDTO.getProfileImg(), myInfoVarDTO.getTier(), myInfoVarDTO.getRank(), myInfoRankDTO.getSumExp(), representativeBadgeId);
    }

    @GetMapping("/profiles/{memberId}")
    public ProfileDTO getProfile(@PathVariable long memberId) {
        ProfileMemberDTO profileMemberDTO = memberService.getProfileMember(memberId);
        ProfileMemberVarDTO profileMemberVarDTO = memberVariableService.getProfileMemberVar(memberId);
        ProfileRankDTO profileRankDTO = rankService.getProfileRank(memberId);
        List<ProfileMemberBadgeDTO> badgeArray = memberBadgeService.getMemberBadges(memberId);
        return new ProfileDTO(profileMemberDTO.getNickname(), profileMemberDTO.getProfileImg(), profileMemberVarDTO.getTier(), profileRankDTO.getSumExp(), badgeArray);
    }

    @DeleteMapping("/members/{memberId}")
    public ResponseEntity<String> deleteMember(@PathVariable long memberId) {
        memberService.delete(memberId);

        String message = String.format("회원 %d번이 삭제되었습니다.", memberId);
        return ResponseEntity.ok()
                .body(message);
    }

    @PatchMapping("/profiles/{memberId}/badges/{badgeId}")
    public String updateRepresentativeBadge(@PathVariable long memberId, @PathVariable long badgeId) {
        // memberId에 해당하는 모든 MemberBadge 엔티티 조회
        List<MemberBadge> memberBadges = memberBadgeRepository.findByMemberMemberId(memberId);

        // memberId에 해당하는 뱃지 중 대표 뱃지로 설정할 뱃지를 찾음
        for (MemberBadge memberBadge : memberBadges) {
            if (memberBadge.getBadgeId() == badgeId) {
                memberBadge.setRepresentative(true); // 대표 뱃지로 설정
            } else {
                memberBadge.setRepresentative(false); // 다른 뱃지들은 대표 뱃지가 아님
            }
            memberBadgeRepository.save(memberBadge); // 변경 사항 저장
        }

        return String.format("대표 뱃지가 %d번으로 변경되었습니다.", badgeId);
    }
}
