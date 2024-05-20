package com.c205.pellongpellong.controller;


import com.c205.pellongpellong.service.DialectVocaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;


@RestController
@RequiredArgsConstructor
public class DialectSpeedQuizController {

    @Autowired
    private DialectVocaService dialectVocaService;

    @GetMapping("/dialect/speed/quiz")
    public ResponseEntity<List<Map<String, Object>>> getQuizSet() {
        List<Map<String, Object>> quizSet = dialectVocaService.generateQuizSet();
        return ResponseEntity.ok(quizSet);
    }
}