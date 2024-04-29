package com.c205.pellongpellong.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Badge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "badgeId", updatable = false)
    private Long badgeId;

    @Column(name = "badgeName",  nullable = false)
    private String badgeName;

    @Column(name = "content",  nullable = true)
    private String content;

    @Builder
    public Badge(Long badgeId, String badgeName, String content) {
        this.badgeId = badgeId;
        this.badgeName = badgeName;
        this.content = content;
    }

}
