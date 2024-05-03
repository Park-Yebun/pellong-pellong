package com.c205.pellongpellong.service;

import com.c205.pellongpellong.dto.LifeQuoteDTO;
import com.c205.pellongpellong.repository.LifeQuoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LifeQuoteService {
    private final LifeQuoteRepository lifeQuoteRepository;

//    public LifeQuoteDTO getLifeQuoteById(Long lifeQuoteId) {
    public int getLifeQuoteById(Long lifeQuoteId) {
//        return lifeQuoteRepository.findById(lifeQuoteId).equals(lifeQuoteId)
        return 1;
//        return lifeQuoteRepository.findById(lifeQuoteId)
//                .orElseThrow(() -> new RuntimeException("Life Quote not found with id: " + lifeQuoteId));
    }
}
