package com.c205.pellongpellong.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class DialectVoca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dialectVocaId;

    @Column(nullable = false)
    private String standardText;

    @Column(nullable = false)
    private String dialectText;

    @Column(nullable = false)
    private String dialectImage;
}