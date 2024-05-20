package com.c205.pellongpellong.service;


import com.c205.pellongpellong.dto.QuizDTO;
import com.c205.pellongpellong.dto.QuizElementDTO;
import com.c205.pellongpellong.entity.Quiz;
import com.c205.pellongpellong.repository.QuizDialectVocaRepository;
import com.c205.pellongpellong.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizService {
    private final QuizRepository quizRepository;
    private final QuizDialectVocaRepository quizDialectVocaRepository;
    public List<QuizDTO> getQuizListByChapter(int chapterNo) {
        int[] quizNumbers = quizRepository.findQuizNoByChapterNo(chapterNo);
        List<QuizDTO> quizListDTO= new ArrayList<>();
        for (int quizNo : quizNumbers) {
            Quiz quiz = quizRepository.findByChapterNoAndQuizNo(chapterNo, quizNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 퀴즈가 존재하지 않습니다."));
            List<Object[]> dialectVocas = quizDialectVocaRepository.findQuizDetailsByQuizId(quiz.getQuizId());
            List<QuizElementDTO> dialectVocasDTO = new ArrayList<>();
            for (Object[] dv : dialectVocas) {
                dialectVocasDTO.add(new QuizElementDTO(dv));
            }
            quizListDTO.add(new QuizDTO(quiz.getQuizId(), quiz.getChapterNo(), quiz.getQuizNo(), quiz.getQuizCategory(), quiz.getQuizAnswer(), dialectVocasDTO));
        }
        return quizListDTO;
    }
}
