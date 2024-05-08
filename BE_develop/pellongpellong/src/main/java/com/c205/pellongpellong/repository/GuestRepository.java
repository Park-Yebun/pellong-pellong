package com.c205.pellongpellong.repository;


import com.c205.pellongpellong.entity.Guest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestRepository extends JpaRepository<Guest, Long> {
    // 필요한 추가 메서드 구현
}