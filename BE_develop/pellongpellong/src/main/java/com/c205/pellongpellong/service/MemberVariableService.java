package com.c205.pellongpellong.service;

import com.c205.pellongpellong.dto.MyInfoVarDTO;
import com.c205.pellongpellong.dto.ProfileMemberVarDTO;
import com.c205.pellongpellong.entity.MemberVariable;
import com.c205.pellongpellong.repository.MemberVariableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class MemberVariableService {

    private final MemberVariableRepository memberVariableRepository;

    public MyInfoVarDTO getMyInfoVar(long memberId) {
        MemberVariable memberVariable = memberVariableRepository.findById(memberId).orElseThrow(() -> new RuntimeException("User not found"));
        return new MyInfoVarDTO(memberVariable.getTier(), memberVariable.getRank());
    }

    public ProfileMemberVarDTO getProfileMemberVar(long memberId){
        MemberVariable memberVariable = memberVariableRepository.findById(memberId).orElseThrow(() -> new RuntimeException("User not found"));
        return new ProfileMemberVarDTO(memberVariable.getTier());
    }

    public LocalDateTime getLoginedAtByMemberId(long memberId) {
        MemberVariable memberVariable = memberVariableRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return memberVariable.getLoginedAt();
    }

    public void updateLoginedAt(long memberId, LocalDateTime loginedAt)  {
        MemberVariable memberVariable = memberVariableRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        memberVariable.setLoginedAt(loginedAt);
        memberVariableRepository.save(memberVariable);
    }
}
