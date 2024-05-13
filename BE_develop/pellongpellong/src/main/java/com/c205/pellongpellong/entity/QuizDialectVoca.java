package com.c205.pellongpellong.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class QuizDialectVoca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quizDialectVocaId", updatable = false)
    private Long quizDialectVocaId;

    @ManyToOne(optional = false,fetch = FetchType.LAZY)
    @JoinColumn(name = "quizId")
    private Quiz quiz;

    @ManyToOne(optional = false,fetch = FetchType.LAZY)
    @JoinColumn(name = "dialectVocaId")
    private DialectVoca dialectVoca;

    @Column(name = "quizOrder", nullable = false)
    private int quizOrder;

    @Column(name = "quizContent")
    private String quizContent;
}
