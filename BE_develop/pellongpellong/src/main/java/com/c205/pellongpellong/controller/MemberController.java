package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.entity.Member;
import com.c205.pellongpellong.dto.AddMemberRequest;
import com.c205.pellongpellong.dto.MemberResponse;
import com.c205.pellongpellong.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor

public class MemberController {

    private final MemberService memberService;

    @PostMapping("/members")
    public ResponseEntity<Member> addMember(@RequestBody AddMemberRequest request) {
        Member savedMember = memberService.save(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedMember);

    }

    @GetMapping("/members/{memberId}")
    public ResponseEntity<MemberResponse> findMember(@PathVariable long memberId) {
        Member member = memberService.findById(memberId);

        return ResponseEntity.ok()
                .body(new MemberResponse(member));
    }
}
