package com.c205.pellongpellong.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Drama {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dramaId;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String title;
}
