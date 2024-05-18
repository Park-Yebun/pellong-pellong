package com.c205.pellongpellong.entity;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
public class Party {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "partyId", updatable = false)
    private Long partyId;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "memberId")
    private Member member; // 참조키로 Member를 연결

    @Column(length = 4)
    private String password;

    @Column(length = 32,nullable = false)
    private String partyName;

    @Column(nullable = false)
    private int kind;

    @Column(nullable = false)
    private int po = 0; // 현재 입장 인원

    @Column(nullable = false, name="`to`")
    private int to; // 최대 입장 인원

    @Column(nullable = false)
    private Boolean isPublic;

    @OneToMany(mappedBy = "party", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Guest> guests = new ArrayList<>();
}
