package com.c205.pellongpellong.service;

import com.c205.pellongpellong.entity.MemberBadge;
import com.c205.pellongpellong.repository.MemberBadgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberBadgeService {

    private final MemberBadgeRepository memberBadgeRepository;

    public Long getRepresentativeBadgeId(Long memberId) {
        // memberId를 기반으로 isRepresentative가 true인 MemberBadge를 찾습니다.
        MemberBadge memberBadge = memberBadgeRepository.findByMemberMemberIdAndIsRepresentative(memberId, true);

        if (memberBadge == null) {
            // isRepresentative가 true인 MemberBadge가 없을 경우 예외 처리
            throw new RuntimeException("Representative badge not found for memberId: " + memberId);
        }
        return memberBadge.getBadgeId();
    }

}
