package com.c205.pellongpellong.service;

import com.c205.pellongpellong.entity.DialectVoca;
import com.c205.pellongpellong.repository.DialectVocaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DialectVocaService {

    @Autowired
    private DialectVocaRepository repository;

    public List<Map<String, Object>> generateQuizSet() {
        List<Map<String, Object>> quizSet = new ArrayList<>();
        List<DialectVoca> allVocas = repository.findAll();

        for (int i = 0; i < 10; i++) {
            Collections.shuffle(allVocas);
            DialectVoca correctAnswer = allVocas.get(0);
            List<DialectVoca> falseAnswers = allVocas.stream()
                    .filter(v -> !v.getDialectVocaId().equals(correctAnswer.getDialectVocaId()))
                    .limit(1)
                    .toList();  // Using Java 17's toList() method

            Map<String, Object> quizCards = new HashMap<>();
            quizCards.put("standardText", correctAnswer.getStandardText());
            quizCards.put("dialectText", correctAnswer.getDialectText());
            quizCards.put("dialectImage", correctAnswer.getDialectImage());
            quizCards.put("false", falseAnswers.get(0).getDialectText());  // Assuming false answer is a dialectText

            quizSet.add(quizCards);
        }
        return quizSet;
    }
}