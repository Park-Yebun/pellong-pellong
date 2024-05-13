package com.c205.pellongpellong.entity;


import jakarta.persistence.*;
import lombok.*;


@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Table(name = "Quiz")
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quizId", updatable = false)
    private Long quizId;

    @Column(name = "chapterNo", nullable = false)
    private int chapterNo;

    @Column(name = "quizNo", nullable = false)
    private int quizNo;

    @Column(name = "quezCategory", nullable = false)
    private int quizCategory;

    @Column(name = "quizAnswer", nullable = false)
    private int quizAnswer;
}
