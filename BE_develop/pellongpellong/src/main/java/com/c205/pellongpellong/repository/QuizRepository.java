package com.c205.pellongpellong.repository;

import com.c205.pellongpellong.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    Optional<Quiz> findByChapterNoAndQuizNo(int chapterNo, int quizNo);
}
