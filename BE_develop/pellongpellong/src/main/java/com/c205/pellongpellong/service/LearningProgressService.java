package com.c205.pellongpellong.service;

import com.c205.pellongpellong.entity.LearningProgress;
import com.c205.pellongpellong.entity.Member;
import com.c205.pellongpellong.repository.LearningProgressRepository;
import com.c205.pellongpellong.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LearningProgressService {

    private final LearningProgressRepository learningProgressRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public LearningProgressService(LearningProgressRepository learningProgressRepository, MemberRepository memberRepository) {
        this.learningProgressRepository = learningProgressRepository;
        this.memberRepository = memberRepository;
    }

    public Integer getChapterNumberByMemberId(Long memberId) {
        LearningProgress learningProgress = learningProgressRepository.findByMemberMemberId(memberId);
        if (learningProgress != null) {
            return learningProgress.getChapterNumber();
        } else {
            // 해당 멤버의 LearningProgress가 없을 경우 예외처리 또는 기본값 반환
            return 0; // 예시로 0을 반환하거나, 예외를 throw할 수 있습니다.
        }
    }

    public void createLearningProgress(Long memberId) {
        // memberId로 Member 엔티티를 찾습니다.
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Member with ID " + memberId + " not found"));

        // LearningProgress 엔티티를 생성합니다.
        LearningProgress learningProgress = LearningProgress.builder()
                .member(member)
                .chapterNumber(1) // chapterNumber를 1로 설정합니다.
                .build();

        // LearningProgress를 저장합니다.
        learningProgressRepository.save(learningProgress);
    }

    public void updateChapterNumberByMemberId(Long memberId, Integer newChapterNumber) {
        // memberId로 LearningProgress 엔티티를 찾습니다.
        LearningProgress learningProgress = learningProgressRepository.findByMemberMemberId(memberId);
        if (learningProgress != null) {
            // 찾은 LearningProgress 엔티티의 chapterNumber를 새로운 값으로 업데이트합니다.
            learningProgress.setChapterNumber(newChapterNumber);
            learningProgressRepository.save(learningProgress);
        } else {
            // 해당 memberId에 해당하는 LearningProgress가 없을 경우 예외 처리를 수행할 수 있습니다.
            throw new RuntimeException("LearningProgress not found for memberId: " + memberId);
        }
    }



}
