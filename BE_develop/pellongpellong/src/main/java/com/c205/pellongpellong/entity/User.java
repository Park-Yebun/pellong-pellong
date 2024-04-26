package com.c205.pellongpellong.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(length = 100)
    private String email;

    @Column(length = 100)
    private String nickname;

    @Column(length = 255)
    private String profileImg;

    @Builder
    public User(Long userId, String email, String nickname, String profileImg) {
        this.userId = userId;
        this.email = email;
        this.nickname = nickname;
        this.profileImg = profileImg;
    }


}
