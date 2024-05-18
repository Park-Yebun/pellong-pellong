package com.c205.pellongpellong.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
public class LearningProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "learningProgressId", updatable = false)
    private Long learningProgressId;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "memberId")
    private Member member;

    @Column(name = "chapterNumber", nullable = false)
    private int chapterNumber;

    @Builder
    public LearningProgress(Long learningProgressId, Member member, int chapterNumber) {
        this.learningProgressId = learningProgressId;
        this.member = member;
        this.chapterNumber = chapterNumber;
    }
}
