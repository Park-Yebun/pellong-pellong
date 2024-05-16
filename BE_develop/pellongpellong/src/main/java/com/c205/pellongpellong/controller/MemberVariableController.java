package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.service.MemberVariableService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//import org.springframework.web.bind.annotation.PatchMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class MemberVariableController {

    private final MemberVariableService memberVariableService;

    @GetMapping("/login/history/{memberId}")
    public LocalDateTime getLoginHistoryByMemberId(@PathVariable long memberId) {
        return memberVariableService.getLoginedAtByMemberId(memberId);
    }

    @PatchMapping("/login/history/{memberId}")
    public String updateLoginTime(@PathVariable long memberId) {
        memberVariableService.updateLoginedAt(memberId, LocalDateTime.now());
        return "현재시각으로 최근 로그인 일시가 변경되었습니다.";

    }

    @PostMapping("/member-variable/{myId}")
    public ResponseEntity<String> addMemberVariable(@PathVariable Long myId) {
        memberVariableService.addMemberVariable(myId);
        return ResponseEntity.status(HttpStatus.CREATED).body(myId + " 번 회원의 MemberVariable이 추가되었습니다.");
    }
}
