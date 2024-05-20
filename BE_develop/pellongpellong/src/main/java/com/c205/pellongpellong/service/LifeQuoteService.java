package com.c205.pellongpellong.service;

import com.c205.pellongpellong.dto.LifeQuoteDTO;
import com.c205.pellongpellong.entity.LifeQuote;
import com.c205.pellongpellong.repository.LifeQuoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LifeQuoteService {
    private final LifeQuoteRepository lifeQuoteRepository;

    public LifeQuoteDTO getLifeQuote(Long lifeQuoteId) {
        LifeQuote lifeQuote = lifeQuoteRepository.findById(lifeQuoteId)
                .orElseThrow(() -> new IllegalArgumentException("not found: " + lifeQuoteId));
        return new LifeQuoteDTO(lifeQuote.getLifeQuoteId(), lifeQuote.getLifeQuoteContent());
    }
}