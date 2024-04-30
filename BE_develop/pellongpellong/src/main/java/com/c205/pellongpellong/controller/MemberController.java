package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.dto.*;
import com.c205.pellongpellong.entity.Member;
import com.c205.pellongpellong.service.MemberBadgeService;
import com.c205.pellongpellong.service.MemberService;
import com.c205.pellongpellong.service.MemberVariableService;
import com.c205.pellongpellong.service.RankService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
//@Slf4j

public class MemberController {

    private final MemberService memberService;

    private final MemberVariableService memberVariableService;

    private final RankService rankService;

    private final MemberBadgeService memberBadgeService;

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
}
