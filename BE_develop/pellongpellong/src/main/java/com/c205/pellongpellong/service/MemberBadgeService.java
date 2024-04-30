package com.c205.pellongpellong.service;

import com.c205.pellongpellong.dto.ProfileMemberBadgeDTO;
import com.c205.pellongpellong.entity.MemberBadge;
import com.c205.pellongpellong.repository.MemberBadgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    public List<ProfileMemberBadgeDTO> getMemberBadges(Long memberId) {
        // memberId를 이용하여 해당 멤버의 모든 뱃지 정보 조회
        List<MemberBadge> memberBadges = memberBadgeRepository.findByMemberMemberId(memberId);

        // MemberBadge 객체를 ProfileMemberBadgeDTO로 변환
        List<ProfileMemberBadgeDTO> profileMemberBadges = memberBadges.stream()
                .map(memberBadge -> new ProfileMemberBadgeDTO(
                        memberBadge.getBadgeId(),
                        memberBadge.isAcquired(),
                        memberBadge.isRepresentative()
                ))
                .collect(Collectors.toList());

        return profileMemberBadges;
    }

}
