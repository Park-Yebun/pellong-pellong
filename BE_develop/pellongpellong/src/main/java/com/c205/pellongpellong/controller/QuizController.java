package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.dto.QuizDTO;
import com.c205.pellongpellong.entity.Quiz;
import com.c205.pellongpellong.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class QuizController {
    private final QuizRepository quizRepository;
    @GetMapping("/quiz/{chapterNo}/{quizNo}")
    public ResponseEntity<QuizDTO> getQuiz(@PathVariable int chapterNo, @PathVariable int quizNo) {
        Quiz quiz = quizRepository.findByChapterNoAndQuizNo(chapterNo, quizNo)
                .orElseThrow(() -> new IllegalArgumentException("해당 퀴즈가 존재하지 않습니다."));
//        QuizDTO quiz = quizService.getQuiz(chapterNo, quizNo);
        List<Integer> zz = List.of(1, 2, 3, 4, 5);
        QuizDTO quizDTO = new QuizDTO(quiz.getQuizId(), quiz.getChapterNo(), quiz.getQuizNo(), quiz.getQuizCategory(), quiz.getQuizAnswer(), zz);
        return ResponseEntity.ok().body(quizDTO);
    }
}
