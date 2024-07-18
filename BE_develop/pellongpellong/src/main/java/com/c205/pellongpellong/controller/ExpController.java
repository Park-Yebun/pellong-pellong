package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.dto.*;
import com.c205.pellongpellong.repository.ExpRepository;
import com.c205.pellongpellong.repository.MemberRepository;
import com.c205.pellongpellong.repository.MemberVariableRepository;
import com.c205.pellongpellong.service.DailyQuestService;
import com.c205.pellongpellong.service.ExpService;
import com.c205.pellongpellong.service.MemberVariableService;
import com.c205.pellongpellong.service.RankService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ExpController {

    private final ExpService expService;
    private final RankService rankService;
    private final DailyQuestService dailyQuestService;
    private final MemberVariableService memberVariableService;
    private final ExpRepository expRepository;
    private final MemberRepository memberRepository;
//    private final MemberComparisonDTO memberComparisonDTO;
    @GetMapping("/profiles/explog/{memberId}")
    public ResponseEntity<List<ExpDTO>> getExpByMemberId(@PathVariable Long memberId) {
        List<ExpDTO> expList = expService.getExpByMemberId(memberId);
        return ResponseEntity.ok(expList);
    }


    // 경험치 획득 API
    @PatchMapping("/exp/attendance/{myId}")
    public ResponseEntity<String> earnAttendanceExp(@PathVariable Long myId) {
        String expName = "일일출석";
        int expValue = 5;
        expService.addExp(myId, expName, expValue);  // 테이블 Exp 행 추가
        rankService.updateSumExp(myId, expValue);  // 테이블 Rank 업데이트
        dailyQuestService.updateDailyExp(myId, expValue);   // 테이블 DailyQuest 업데이트
        memberVariableService.updateAccDailyQuest(myId);  // 테이블 MemberVariable 업데이트: accDailyQuest
        return ResponseEntity.status(HttpStatus.OK).body(myId + " 번 회원의 경험치 갱신(사유: 일일출석)");
    }

    @PatchMapping("/exp/quiz-solving/{myId}")
    public ResponseEntity<String> earnQuizSolvingExp(@PathVariable Long myId) {
        String expName = "퀴즈 챕터 완료";
        int expValue = 100;
        expService.addExp(myId, expName, expValue);  // 테이블 Exp 행 추가
        rankService.updateSumExp(myId, expValue);  // 테이블 Rank 업데이트
        dailyQuestService.updateDailyExp(myId, expValue);   // 테이블 DailyQuest 업데이트
        memberVariableService.updateAccDailyQuest(myId);  // 테이블 MemberVariable 업데이트: accDailyQuest
        return ResponseEntity.status(HttpStatus.OK).body(myId + " 번 회원의 경험치 갱신(사유: 퀴즈 챕터 완료)");
    }

    @PatchMapping("/exp/quiz-solving-passed/{myId}")
    public ResponseEntity<String> earnQuizSolvingPassedExp(@PathVariable Long myId) {
        String expName = "퀴즈 챕터 완료 (90점 이상)";
        int expValue = 100;
        expService.addExp(myId, expName, expValue);  // 테이블 Exp 행 추가
        rankService.updateSumExp(myId, expValue);  // 테이블 Rank 업데이트
        dailyQuestService.updateDailyExpAndIsPassed(myId, expValue);   // 테이블 DailyQuest 업데이트: dailyExp, isPassed
        memberVariableService.updateAccDailyQuest(myId);  // 테이블 MemberVariable 업데이트: accDailyQuest
        return ResponseEntity.status(HttpStatus.OK).body(myId + " 번 회원의 경험치 갱신(사유: 퀴즈 챕터 완료, 90점 이상으로 통과)");
    }

    @PatchMapping("/exp/test-sharing/{myId}")
    public ResponseEntity<String> earnTestSharingExp(@PathVariable Long myId) {
        String expName = "모의고사 결과 공유";
        int expValue = 50;
        expService.addExp(myId, expName, expValue);  // 테이블 Exp 행 추가
        rankService.updateSumExp(myId, expValue);  // 테이블 Rank 업데이트
        dailyQuestService.updateDailyExpAndIsShared(myId, expValue);   // 테이블 DailyQuest 업데이트: dailyExp, isShared
        memberVariableService.updateAccDailyQuest(myId);  // 테이블 MemberVariable 업데이트: accDailyQuest
        return ResponseEntity.status(HttpStatus.OK).body(myId + " 번 회원의 경험치 갱신(사유: 모의고사 결과 공유)");
    }
    @PatchMapping("/exp/speed-game")
    public ResponseEntity<String> earnSpeedGameExp(@RequestBody List<PlayerDTO> playerDTOList) {
//    public ResponseEntity<List<PlayerDTO>> earnSpeedGameExp(@RequestBody List<PlayerDTO> playerDTOList) {
//        return ResponseEntity.status(HttpStatus.OK).body("모든 참가자의 경험치 갱신");
        String expName = "스피드 게임 진행";
        expService.addPlayersExp(playerDTOList, expName);
        rankService.updatePlayersSumExp(playerDTOList);  // 테이블 Rank 업데이트
        dailyQuestService.updatePlayersDailyExp(playerDTOList);
        memberVariableService.updatePlayersAccDailyQuest(playerDTOList);  // 테이블 MemberVariable 업데이트: accDailyQuest
//        return ResponseEntity.status(HttpStatus.OK).body(playerDTOList);
        return ResponseEntity.status(HttpStatus.OK).body("스피드 게임 참가자들의 경험치가 갱신되었습니다.");
    }


//    @PatchMapping("/exp/speed-game/{myId}/{speedGameRank}")
//    public ResponseEntity<String> earnSpeedGameExp(@PathVariable Long myId, @PathVariable int speedGameRank) {
//        /*
//        추가 경험치
//        스피드게임 결과에 따라: 30, 20, 10, 5
//        사투리 대사, 가사 보고 제목 맞추기: 15(멀티), 10(싱글)
//         */
//        int [] expValue = {30, 20, 10, 5, 5, 5};  // 등수에 따른 경험치
//        String expName = "스피드 게임 " + speedGameRank + "위";
////        int expValue = 50;
//        expService.addExp(myId, expName, expValue[speedGameRank-1]);  // 테이블 Exp 행 추가
//        rankService.updateSumExp(myId, expValue[speedGameRank-1]);  // 테이블 Rank 업데이트
//        dailyQuestService.updateDailyExp(myId, expValue[speedGameRank-1]);   // 테이블 DailyQuest 업데이트
//
//        return ResponseEntity.status(HttpStatus.OK).body(myId + " 번 회원의 경험치 갱신(사유: 스피드 게임 " + speedGameRank + "위)");
//    }

//    @PatchMapping("/exp/culture-single/{myId}")
//    public ResponseEntity<String> earnCultureSingleExp(@PathVariable Long myId) {
//        String expName = "사투리 놀이터 싱글플레이";
//        int expValue = 10;
//        expService.addExp(myId, expName, expValue);  // 테이블 Exp 행 추가
//        rankService.updateSumExp(myId, expValue);  // 테이블 Rank 업데이트
//        dailyQuestService.updateDailyExp(myId, expValue);   // 테이블 DailyQuest 업데이트
//
//        return ResponseEntity.status(HttpStatus.OK).body(myId + " 번 회원의 경험치 갱신(사유: 사투리 놀이터 싱글플레이)");
//    }


//    @PatchMapping("/exp/culture-multi")
//    public ResponseEntity<String> earnCultureMultiExp(@RequestBody List<PlayerDTO> playerDTOList) {
//        /*
//        추가 경험치
//        스피드게임 결과에 따라: 30, 20, 10, 5
//        사투리 대사, 가사 보고 제목 맞추기: 15(멀티), 10(싱글)
//         */
////        int [] expValue = {30, 20, 10, 5, 5, 5};
//        String expName = "사투리 놀이터 멀티플레이";
//        expService.addPlayersExp(playerDTOList, expName);  // 테이블 Exp 행 추가
//        rankService.updatePlayersSumExp(playerDTOList);  // 테이블 Rank 업데이트
//        dailyQuestService.updatePlayersDailyExp(playerDTOList);   // 테이블 DailyQuest 업데이트, 모의고
//
//        return ResponseEntity.status(HttpStatus.OK).body("사투리 놀이터 참가자들의 경험치 갱신");
//    }
//    @PatchMapping("/exp/culture-multi/{myId}")
//    public ResponseEntity<String> earnCultureMultiExp(@PathVariable Long myId) {
//        /*
//        추가 경험치
//        스피드게임 결과에 따라: 30, 20, 10, 5
//        사투리 대사, 가사 보고 제목 맞추기: 15(멀티), 10(싱글)
//         */
////        int [] expValue = {30, 20, 10, 5, 5, 5};
//        String expName = "사투리 놀이터 멀티플레이";
//        int expValue = 15;
//        expService.addExp(myId, expName, expValue);  // 테이블 Exp 행 추가
//        rankService.updateSumExp(myId, expValue);  // 테이블 Rank 업데이트
//        dailyQuestService.updateDailyExp(myId, expValue);   // 테이블 DailyQuest 업데이트, 모의고
//
//        return ResponseEntity.status(HttpStatus.OK).body(myId + " 번 회원의 경험치 갱신(사유: 사투리 놀이터 멀티플레이)");
//    }
    @GetMapping("/exp/comparison-local-date-time")
    public void comparisonLocalDateTime() {
        LocalDateTime t1 = LocalDateTime.now();
        LocalDate t1d = t1.toLocalDate();
        LocalDateTime t2 = LocalDateTime.of(2024, 5, 11, 16, 0);
        LocalDate t2d = t2.toLocalDate();
        System.out.println("t1: " + t1);
        System.out.println("t1d: " + t1d);
        System.out.println("t2: " + t2);
        System.out.println("t2d: " + t2d);
        System.out.println("일치여부: " + t1d.isEqual(t2d));
        System.out.println("날짜차이: " + t1d.compareTo(t2d));
    }

    @GetMapping("/exp/{loginedId}/{selectedId}")
    public ResponseEntity<List<ExpComparisonResponse>> getRecentDailyExp(@PathVariable Long loginedId, @PathVariable Long selectedId) {
        List<ExpComparisonResponse> expComparisonResponses = new ArrayList<>();
        List<Long> memberIds = Arrays.asList(loginedId, selectedId);
        for (Long memberId : memberIds) {
            String memberNickName = memberRepository.findByMemberId(memberId)
                    .orElseThrow(() -> new IllegalArgumentException("해당하는 회원이 없습니다.")).getNickname();
            List<Object[]> dailyExpList = expRepository.findRecentDailyExp(memberId);
            List<DailyExpDTO> dailyExpDTOList = new ArrayList<>();
            for (Object[] de : dailyExpList) {
                dailyExpDTOList.add(new DailyExpDTO((de)));
            }
            expComparisonResponses.add(new ExpComparisonResponse(memberId, memberNickName, dailyExpDTOList));
        }
        return ResponseEntity.ok().body(expComparisonResponses);
    }
}
