package com.c205.pellongpellong.service;

import com.c205.pellongpellong.dto.MyInfoMemberDTO;
import com.c205.pellongpellong.dto.ProfileMemberDTO;
import com.c205.pellongpellong.dto.ProfileMemberVarDTO;
import com.c205.pellongpellong.entity.Member;
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

    public Member findById(long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("not found: " + memberId));
    }

    public MyInfoMemberDTO getMyInfoMember(long memberId){
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RuntimeException("User not found"));
        return new MyInfoMemberDTO(member.getEmail(), member.getNickname(), member.getProfileImg());

    }

    public ProfileMemberDTO getProfileMember(long memberId){
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RuntimeException("User not found"));
        return new ProfileMemberDTO(member.getNickname(), member.getProfileImg());
    }


}
