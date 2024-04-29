package com.c205.pellongpellong.service;

import com.c205.pellongpellong.domain.Member;
import com.c205.pellongpellong.dto.AddMemberRequest;
import com.c205.pellongpellong.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Member save(AddMemberRequest request) {
        return memberRepository.save(request.toEntity());
    }

//    public User findById(long userId) {
//        return userRepository.findById(userId)
//                .orElseThrow(() -> new IllegalArgumentException("not found: " + userId));
//    }
}
