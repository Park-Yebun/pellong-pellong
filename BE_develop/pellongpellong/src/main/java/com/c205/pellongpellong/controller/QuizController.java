package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.dto.QuizDTO;
import com.c205.pellongpellong.dto.QuizElementDTO;
import com.c205.pellongpellong.entity.Quiz;
import com.c205.pellongpellong.repository.QuizDialectVocaRepository;
import com.c205.pellongpellong.repository.QuizRepository;
import com.c205.pellongpellong.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class QuizController {
    private final QuizService quizService;
    private final QuizRepository quizRepository;
    private final QuizDialectVocaRepository quizDialectVocaRepository;
//    @GetMapping("/quiz/{chapterNo}/{quizNo}")
//    public ResponseEntity<QuizDTO> getQuiz(@PathVariable int chapterNo, @PathVariable int quizNo) {
//        Quiz quiz = quizRepository.findByChapterNoAndQuizNo(chapterNo, quizNo)
//                .orElseThrow(() -> new IllegalArgumentException("해당 퀴즈가 존재하지 않습니다."));
//        List<Object[]> dialectVocas = quizDialectVocaRepository.findQuizDetailsByQuizId(quiz.getQuizId());
//        List<QuizElementDTO> dialectVocasDTO = new ArrayList<>();
//        for (Object[] dv : dialectVocas) {
//            dialectVocasDTO.add(new QuizElementDTO(dv));
//        }
//
//        QuizDTO quizDTO = new QuizDTO(quiz.getQuizId(), quiz.getChapterNo(), quiz.getQuizNo(), quiz.getQuizCategory(), quiz.getQuizAnswer(), dialectVocasDTO);
//        return ResponseEntity.ok().body(quizDTO);
//    }

    @GetMapping("/quiz/{chapterNo}")
    public ResponseEntity<List<QuizDTO>> getQuizListByChapter(@PathVariable int chapterNo) {
        List<QuizDTO> quizListDTO = quizService.getQuizListByChapter(chapterNo);
        return ResponseEntity.ok().body(quizListDTO);
    }
}
