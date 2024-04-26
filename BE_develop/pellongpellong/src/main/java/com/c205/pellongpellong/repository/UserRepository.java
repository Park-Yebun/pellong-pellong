package com.c205.pellongpellong.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.lang.reflect.Member;

public interface UserRepository extends JpaRepository<Member, Long> {
}
