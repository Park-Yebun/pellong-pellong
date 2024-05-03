package com.c205.pellongpellong.controller;


import com.c205.pellongpellong.dto.LifeQuoteDTO;
import com.c205.pellongpellong.entity.LifeQuote;
import com.c205.pellongpellong.service.LifeQuoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class LifeQuoteController {

    private final LifeQuoteService lifeQuoteService;

    @GetMapping("/life-quotes/{lifeQuoteId}")
    public int getLifeQuoteById(@PathVariable Long lifeQuoteId) {
//    public LifeQuoteDTO getLifeQuoteById(@PathVariable Long lifeQuoteId) {
//        LifeQuoteDTO lifeQuoteDTO = lifeQuoteService.getLifeQuoteById(lifeQuoteId);
//        return ResponseEntity.ok(lifeQuote);
        return 1;
    }
}
