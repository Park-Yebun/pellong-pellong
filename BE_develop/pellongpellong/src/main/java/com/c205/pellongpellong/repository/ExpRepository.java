package com.c205.pellongpellong.repository;

import com.c205.pellongpellong.entity.Exp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpRepository extends JpaRepository<Exp, Long> {
    List<Exp> findByMember_MemberId(Long memberId);
}
