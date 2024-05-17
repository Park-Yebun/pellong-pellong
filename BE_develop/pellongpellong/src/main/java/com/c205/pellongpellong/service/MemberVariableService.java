package com.c205.pellongpellong.service;

import com.c205.pellongpellong.dto.MyInfoVarDTO;
import com.c205.pellongpellong.dto.PlayerDTO;
import com.c205.pellongpellong.dto.ProfileMemberVarDTO;
import com.c205.pellongpellong.entity.DailyQuest;
import com.c205.pellongpellong.entity.Member;
import com.c205.pellongpellong.entity.MemberVariable;
import com.c205.pellongpellong.entity.Rank;
import com.c205.pellongpellong.repository.DailyQuestRepository;
import com.c205.pellongpellong.repository.MemberRepository;
import com.c205.pellongpellong.repository.MemberVariableRepository;
import com.c205.pellongpellong.repository.RankRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberVariableService {

    private final MemberVariableRepository memberVariableRepository;
    private final MemberRepository memberRepository;
    private final RankRepository rankRepository;
    private final DailyQuestRepository dailyQuestRepository;

    public MyInfoVarDTO getMyInfoVar(long memberId) {
        MemberVariable memberVariable = memberVariableRepository.findByMember_MemberId(memberId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new MyInfoVarDTO(memberVariable.getTier(), memberVariable.getRank());
    }

    public ProfileMemberVarDTO getProfileMemberVar(long memberId){
//        MemberVariable memberVariable = memberVariableRepository.findById(memberId).orElseThrow(() -> new RuntimeException("User not found"));
        MemberVariable memberVariable = memberVariableRepository.findByMember_MemberId(memberId).orElseThrow(() -> new RuntimeException("User not found"));
        return new ProfileMemberVarDTO(memberVariable.getTier());
    }

    public LocalDateTime getLoginedAtByMemberId(long memberId) {
//        MemberVariable memberVariable = memberVariableRepository.findById(memberId)
        MemberVariable memberVariable = memberVariableRepository.findByMember_MemberId(memberId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return memberVariable.getLoginedAt();
    }

    public void updateLoginedAt(long memberId, LocalDateTime loginedAt)  {
//        MemberVariable memberVariable = memberVariableRepository.findById(memberId)
        MemberVariable memberVariable = memberVariableRepository.findByMember_MemberId(memberId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        memberVariable.setLoginedAt(loginedAt);
        memberVariableRepository.save(memberVariable);
    }

    public void addMemberVariable(long myId) {
        Member member = memberRepository.findById(myId)
                .orElseThrow(() -> new RuntimeException("해당 memberId에 해당하는 회원이 존재하지 않습니다."));
        Rank rank = rankRepository.findByMemberMemberId(myId)
                .orElseThrow(() -> new RuntimeException("해당 memberId에 해당하는 회원의 Rank가 존재하지 않습니다."));
//        System.out.println("member: " + member);
//        System.out.println("rank: " + rank.getRankId());
//        System.out.println("loginedAt : " + LocalDateTime.now());

        MemberVariable memberVariable = MemberVariable.builder()
                .member(member)
                .tier("금귤")
                .rank(rank.getRankId())
                .accDailyQuest(0)
                .accLark(0)
                .accOwl(0)
                .loginedAt(LocalDateTime.now())
                .build();
        memberVariableRepository.save(memberVariable);
    }

    public void updateAccDailyQuest (long myId) {
        DailyQuest dailyQuest = dailyQuestRepository.findByMemberMemberId(myId)
                .orElseThrow(() -> new RuntimeException("해당 memberId에 해당하는 회원의 DailyQuest가 존재하지 않습니다."));
        MemberVariable memberVariable = memberVariableRepository.findById(myId)
                .orElseThrow(() -> new RuntimeException("해당 memberId에 해당하는 회원의 MemberVariable이 존재하지 않습니다."));
        if (
                dailyQuest.getDailyExp() >= 300
                && dailyQuest.isPassed()
                && dailyQuest.isShared()
                && !dailyQuest.isAccomplished()
        ) {
            memberVariable.setAccDailyQuest(memberVariable.getAccDailyQuest() + 1);
            dailyQuest.setAccomplished(true);
            memberVariableRepository.save(memberVariable);
            dailyQuestRepository.save(dailyQuest);
            System.out.println(myId + " 번 회원의 누적 일일퀘스트가 갱신되었습니다.");
        }
    }

    public void updatePlayersAccDailyQuest (List<PlayerDTO> players) {
        for (PlayerDTO player : players) {
            DailyQuest dailyQuest = dailyQuestRepository.findByMemberMemberId(player.getPlayerId())
                    .orElseThrow(() -> new RuntimeException("해당 memberId에 해당하는 회원의 DailyQuest가 존재하지 않습니다."));
            MemberVariable memberVariable = memberVariableRepository.findById(player.getPlayerId())
                    .orElseThrow(() -> new RuntimeException("해당 memberId에 해당하는 회원의 MemberVariable이 존재하지 않습니다."));
            if (
                    dailyQuest.getDailyExp() >= 300
                    && dailyQuest.isPassed()
                    && dailyQuest.isShared()
                    && !dailyQuest.isAccomplished()
            ) {
                memberVariable.setAccDailyQuest(memberVariable.getAccDailyQuest() + 1);
                dailyQuest.setAccomplished(true);
                memberVariableRepository.save(memberVariable);
                dailyQuestRepository.save(dailyQuest);
                System.out.println(player.getPlayerId() + " 번 회원의 누적 일일퀘스트가 갱신되었습니다.");
            }
        }
    }
}
