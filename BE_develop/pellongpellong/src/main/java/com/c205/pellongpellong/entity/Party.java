package com.c205.pellongpellong.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
public class Party {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long partyId;

    @Column(length = 32,nullable = false)
    private String partyName;

    @Column(length = 4,nullable = false)
    private String password;

    @Column(nullable = false)
    private int kind;

    @Column(nullable = false)
    private int po;

    @Column(nullable = false)
    private int to = 1;

    @Column(nullable = false)
    private boolean isPublic = true;

    @OneToOne(optional = true,fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId", referencedColumnName = "memberId")
    private Member member;

    @Builder
    public Party(String partyName, String password, int kind, int po, int to, boolean isPublic, Member member) {
        this.partyName = partyName;
        this.password = password;  // Assume password encryption or validation here
        this.kind = kind;
        this.po = po;
        this.to = to;
        this.isPublic = isPublic;
        this.member = member;
    }
}
