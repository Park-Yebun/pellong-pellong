package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.service.MemberVariableService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

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

}
