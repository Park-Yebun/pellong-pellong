package com.c205.pellongpellong.service;

import com.c205.pellongpellong.dto.DailyQuestDTO;
import com.c205.pellongpellong.dto.PlayerDTO;
import com.c205.pellongpellong.entity.DailyQuest;
import com.c205.pellongpellong.entity.Member;
import com.c205.pellongpellong.repository.DailyQuestRepository;
import com.c205.pellongpellong.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service  // 빈에 서비스 등록
@RequiredArgsConstructor  // final 또는  @NotNull 이 붙는 필드의 생성자 생성
public class DailyQuestService {
    private final DailyQuestRepository dailyQuestRepository;  // 레포지토리 주입
    private final MemberRepository memberRepository;
//   public DailyQuest addDailyQuest(DailyQuestDTO dailyQuestDTO) {
   public void addDailyQuest(long myId) {
       Member member = memberRepository.findById(myId)
               .orElseThrow(() -> new RuntimeException("해당 memberId에 해당하는 회원이 존재하지 않습니다."));
       DailyQuest dailyQuest = DailyQuest.builder()
               .member(member)
               .dailyExp(0)
               .isPassed(false)
               .isShared(false)
               .isAccomplished(false)
               .build();
       dailyQuestRepository.save(dailyQuest);
   }

   public void updateDailyExp(long myId, int expValue) {
       DailyQuest dailyQuest = dailyQuestRepository.findByMemberMemberId(myId)
               .orElseThrow(() -> new RuntimeException("해당 memberId에 해당하는 회원의 DailyQuest가 존재하지 않습니다."));
       dailyQuest.setDailyExp(dailyQuest.getDailyExp() + expValue);
       dailyQuestRepository.save(dailyQuest);
   }

   public void updatePlayersDailyExp(List<PlayerDTO> players) {
       for (PlayerDTO player : players) {
           DailyQuest dailyQuest = dailyQuestRepository.findByMemberMemberId(player.getPlayerId())
                   .orElseThrow(() -> new RuntimeException("해당 memberId에 해당하는 회원의 DailyQuest가 존재하지 않습니다."));
           dailyQuest.setDailyExp(dailyQuest.getDailyExp() + player.getPlayerExp());
           dailyQuestRepository.save(dailyQuest);
       }
   }

    public void updateDailyExpAndIsPassed(long myId, int expValue) {
        DailyQuest dailyQuest = dailyQuestRepository.findByMemberMemberId(myId)
                .orElseThrow(() -> new RuntimeException("해당 memberId에 해당하는 회원의 DailyQuest가 존재하지 않습니다."));
        dailyQuest.setDailyExp(dailyQuest.getDailyExp() + expValue);
        dailyQuest.setPassed(true);
        dailyQuestRepository.save(dailyQuest);
    }

    public void updateDailyExpAndIsShared(long myId, int expValue) {
        DailyQuest dailyQuest = dailyQuestRepository.findByMemberMemberId(myId)
                .orElseThrow(() -> new RuntimeException("해당 memberId에 해당하는 회원의 DailyQuest가 존재하지 않습니다."));
        dailyQuest.setDailyExp(dailyQuest.getDailyExp() + expValue);
        dailyQuest.setShared(true);
        dailyQuestRepository.save(dailyQuest);
    }

    @Scheduled(cron = "0 0 0 * * *")  // 초 분 시 일 월 요일
    public void resetDailyQuest() {
        dailyQuestRepository.resetDailyQuest();
        System.out.println("DailyQuest가 초기화되었습니다.");
    }
}
