package com.c205.pellongpellong.service;

import com.c205.pellongpellong.dto.MyInfoMemberDTO;
import com.c205.pellongpellong.dto.ProfileMemberDTO;
import com.c205.pellongpellong.dto.ProfileMemberVarDTO;
import com.c205.pellongpellong.entity.Member;
import com.c205.pellongpellong.dto.AddMemberRequest;
import com.c205.pellongpellong.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    @Autowired
    private final MemberRepository memberRepository;

    public Member saveMember(Member member ) {
        return memberRepository.save(member);
    }

    public Member updateMemberByFields(Long memberId, Map<String, Object> fields) {
        Optional<Member> existingMember = memberRepository.findById(memberId);

        if (existingMember.isPresent()) {
            fields.forEach((key, value) -> {
                Field field = ReflectionUtils.findField(Member.class, key);
                field.setAccessible(true);
                ReflectionUtils.setField(field, existingMember.get(), value);
            });
            return memberRepository.save(existingMember.get());
        }
        return null;
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

    public void delete(long memberId) {
        memberRepository.deleteById(memberId);
    }
}
