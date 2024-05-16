package com.c205.pellongpellong.controller;


import com.c205.pellongpellong.entity.DailyQuest;
import com.c205.pellongpellong.service.DailyQuestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@EnableScheduling
public class DailyQuestController {
    private final DailyQuestService dailyQuestService;
    @PostMapping("/daily-quest/{myId}")
    public ResponseEntity<String> addDailyQuest(@PathVariable long myId) {
        dailyQuestService.addDailyQuest(myId);
        return ResponseEntity.status(HttpStatus.CREATED).body(myId + " 번 회원의 DailyQuest가 추가되었습니다.");
    }
}
