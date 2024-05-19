package com.c205.pellongpellong.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JejuProverb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "jejuProverbId", updatable = false)
    private Long jejuProverbId;

    @Column(name = "pbJeju", nullable = false)
    private String pbJeju;

    @Column(name = "pbStandard", nullable = false)
    private String pbStandard;

}