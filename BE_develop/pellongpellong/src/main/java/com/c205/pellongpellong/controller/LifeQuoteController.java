package com.c205.pellongpellong.controller;


import com.c205.pellongpellong.dto.LifeQuoteDTO;
import com.c205.pellongpellong.entity.LifeQuote;
import com.c205.pellongpellong.repository.LifeQuoteRepository;
import com.c205.pellongpellong.service.LifeQuoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Random;

@RestController
@RequiredArgsConstructor
public class LifeQuoteController {
    private final LifeQuoteService lifeQuoteService;
    private final LifeQuoteRepository lifeQuoteRepository;
    @GetMapping("/life-quotes")
    public LifeQuoteDTO getLifeQuoteById() {
        Random random = new Random();
        Long randomId = random.nextLong(lifeQuoteRepository.count()) + 1;
        LifeQuoteDTO lifeQuote = lifeQuoteService.getLifeQuote(randomId);

        System.out.println(lifeQuoteRepository.count());
        return new LifeQuoteDTO(lifeQuote.getLifeQuoteId(), lifeQuote.getLifeQuoteContent());
    }
}
