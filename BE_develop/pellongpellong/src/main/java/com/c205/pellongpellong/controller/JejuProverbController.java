package com.c205.pellongpellong.controller;


import com.c205.pellongpellong.dto.JejuProverbDTO;
import com.c205.pellongpellong.repository.JejuProverbRepository;
import com.c205.pellongpellong.service.JejuProverbService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
@RequiredArgsConstructor
public class JejuProverbController {
    private final JejuProverbService jejuProverbService;
    private final JejuProverbRepository jejuProverbRepository;

    @GetMapping("/jeju-proverb")
    public JejuProverbDTO getJejuProverbById() {
        Random random = new Random();
        Long randomId = random.nextLong(jejuProverbRepository.count()) + 1;
        JejuProverbDTO jejuProverbDTO = jejuProverbService.getJejuProverb(randomId);
        return new JejuProverbDTO(jejuProverbDTO.getJejuProverbId(), jejuProverbDTO.getPbStandard(), jejuProverbDTO.getPbJeju());
    }
}
