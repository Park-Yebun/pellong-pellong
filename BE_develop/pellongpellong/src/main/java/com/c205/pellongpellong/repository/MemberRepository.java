package com.c205.pellongpellong.repository;

import com.c205.pellongpellong.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
