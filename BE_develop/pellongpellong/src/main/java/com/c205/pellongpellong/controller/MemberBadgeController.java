package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.entity.Badge;
import com.c205.pellongpellong.entity.Member;
import com.c205.pellongpellong.entity.MemberBadge;
import com.c205.pellongpellong.repository.BadgeRepository;
import com.c205.pellongpellong.repository.MemberBadgeRepository;
import com.c205.pellongpellong.repository.MemberRepository;
import com.c205.pellongpellong.service.MemberBadgeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberBadgeController {

    private final MemberBadgeService memberBadgeService;

    private final MemberBadgeRepository memberBadgeRepository;

    private final MemberRepository memberRepository;

    private final BadgeRepository badgeRepository;


    @PostMapping("members/{memberId}/pellong")
    public ResponseEntity<String> addMemberBadge(@PathVariable long memberId) {
        // memberId를 사용하여 member 엔티티를 조회
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("해당 memberId에 해당하는 회원이 존재하지 않습니다."));

        // 설정할 badge 엔티티를 조회
        Badge badge = badgeRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("badgeId가 1인 뱃지를 찾을 수 없습니다."));

        MemberBadge memberBadge = MemberBadge.builder()
                .isAcquired(true)
                .isRepresentative(true)
                .member(member)
                .badge(badge)
                .build();

        // MemberBadge 엔티티를 저장
        memberBadgeRepository.save(memberBadge);

        return ResponseEntity.status(HttpStatus.CREATED).body("MemberBadge 테이블에 memberId " + memberId + "의 가 추가되었습니다.");
    }

}
