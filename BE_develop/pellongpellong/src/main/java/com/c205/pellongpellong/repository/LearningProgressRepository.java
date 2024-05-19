package com.c205.pellongpellong.repository;

import com.c205.pellongpellong.entity.LearningProgress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LearningProgressRepository extends JpaRepository<LearningProgress, Long> {
    LearningProgress findByMemberMemberId(Long memberId);
}
