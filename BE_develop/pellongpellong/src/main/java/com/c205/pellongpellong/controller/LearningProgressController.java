package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.repository.LearningProgressRepository;
import com.c205.pellongpellong.service.LearningProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LearningProgressController {

    private final LearningProgressService learningProgressService;


    @Autowired
    public LearningProgressController(LearningProgressService learningProgressService) {
        this.learningProgressService = learningProgressService;
    }

    @GetMapping("/learning/{memberId}")
    public ResponseEntity<Integer> getChapterNumberByMemberId(@PathVariable Long memberId) {
        Integer chapterNumber = learningProgressService.getChapterNumberByMemberId(memberId);
        return ResponseEntity.ok(chapterNumber);
    }

    @PatchMapping("/learning/{memberId}/{chapterNumber}")
    public ResponseEntity<Void> updateChapterNumberByMemberId(
            @PathVariable Long memberId,
            @PathVariable Integer chapterNumber) {
        // memberId로 LearningProgress 테이블을 찾고 chapterNumber를 업데이트합니다.
        learningProgressService.updateChapterNumberByMemberId(memberId, chapterNumber);
        return ResponseEntity.noContent().build();
    }



}
