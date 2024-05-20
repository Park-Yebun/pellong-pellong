package com.c205.pellongpellong.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class QuizElementDTO {
    private int quizOrder;
    private String quizContent;
    private String standardText;
    private String dialectText;
    private String dialectVoice;
    private String dialectImage;

    public QuizElementDTO(int quizOrder,
                          String quizContent,
                          String standardText,
                          String dialectText,
                          String dialectVoice,
                          String dialectImage)
    {
        this.quizOrder = quizOrder;
        this.quizContent = quizContent;
        this.standardText = standardText;
        this.dialectText = dialectText;
        this.dialectVoice = dialectVoice;
        this.dialectImage = dialectImage;
    }

    public QuizElementDTO(Object[] quizElement) {
        this.quizOrder = (int) quizElement[0];
        this.quizContent = (String) quizElement[1];
        this.standardText = (String) quizElement[2];
        this.dialectText = (String) quizElement[3];
        this.dialectVoice = (String) quizElement[4];
        this.dialectImage = (String) quizElement[5];
    }
}
