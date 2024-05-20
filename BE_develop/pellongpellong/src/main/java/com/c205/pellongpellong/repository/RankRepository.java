package com.c205.pellongpellong.repository;

import com.c205.pellongpellong.entity.Rank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Spliterator;

public interface RankRepository extends JpaRepository<Rank, Long> {
    Optional<Rank> findByMemberMemberId(Long memberId);
}
