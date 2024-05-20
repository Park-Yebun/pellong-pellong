package com.c205.pellongpellong.repository;

import com.c205.pellongpellong.entity.DialectVoca;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DialectVocaRepository extends JpaRepository<DialectVoca, Long> {
    List<DialectVoca> findByStandardText(String standardText);
}