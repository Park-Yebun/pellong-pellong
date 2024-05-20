package com.c205.pellongpellong.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Kpop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long kpopId;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String singer;
}