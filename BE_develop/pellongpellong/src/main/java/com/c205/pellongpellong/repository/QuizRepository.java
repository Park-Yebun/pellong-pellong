package com.c205.pellongpellong.repository;

import com.c205.pellongpellong.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    Optional<Quiz> findByChapterNoAndQuizNo(int chapterNo, int quizNo);

    @Query(value = "SELECT quizNo from Quiz WHERE chapterNo = :chapterNo", nativeQuery = true)
    int[] findQuizNoByChapterNo(int chapterNo);
}
