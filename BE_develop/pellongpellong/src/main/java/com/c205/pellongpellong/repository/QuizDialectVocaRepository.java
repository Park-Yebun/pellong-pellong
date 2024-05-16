package com.c205.pellongpellong.repository;

import com.c205.pellongpellong.dto.QuizElementDTO;
import com.c205.pellongpellong.entity.QuizDialectVoca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuizDialectVocaRepository extends JpaRepository<QuizDialectVoca, Long> {
    @Query(value = "SELECT q.quizOrder, q.quizContent, d.standardText, d.dialectText, d.dialectVoice, d.dialectImage " +
            "FROM QuizDialectVoca q JOIN DialectVoca d ON q.dialectVocaId = d.dialectVocaId " +
            "WHERE q.quizId = :quizId ORDER BY q.quizOrder", nativeQuery = true)
    List<Object[]> findQuizDetailsByQuizId(@Param("quizId") Long quizId);
}
