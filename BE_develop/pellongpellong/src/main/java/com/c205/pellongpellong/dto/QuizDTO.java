package com.c205.pellongpellong.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Objects;

@Getter
@NoArgsConstructor
public class QuizDTO {
    private Long quizId;
    private int quizChapterNo;
    private int quizNo;
    private int quizCategory;
    private int quizAnswer;
    private List<QuizElementDTO> dialectVocas;

    public QuizDTO(Long quizId, int quizChapterNo, int quizNo, int quizCategory, int quizAnswer, List<QuizElementDTO> dialectVocas) {
        this.quizId = quizId;
        this.quizChapterNo = quizChapterNo;
        this.quizNo = quizNo;
        this.quizCategory = quizCategory;
        this.quizAnswer = quizAnswer;
        this.dialectVocas = dialectVocas;
    }
}
