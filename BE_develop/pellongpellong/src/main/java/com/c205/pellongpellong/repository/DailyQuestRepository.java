package com.c205.pellongpellong.repository;

import com.c205.pellongpellong.entity.DailyQuest;
import com.c205.pellongpellong.entity.Rank;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface DailyQuestRepository extends JpaRepository<DailyQuest, Long>{
    Optional<DailyQuest> findByMemberMemberId(Long memberId);

    @Modifying
    @Transactional
    @Query("UPDATE DailyQuest d SET d.dailyExp = 0, d.isPassed = false, d.isShared = false, d.isAccomplished = false")
    void resetDailyQuest();

}
