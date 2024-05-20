package com.c205.pellongpellong.repository;  // step2. 리포지터리 만들기

import com.c205.pellongpellong.entity.ShadowingClip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShadowingClipRepository extends JpaRepository<ShadowingClip, Long> {

}
