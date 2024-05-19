package com.c205.pellongpellong.service;

import com.c205.pellongpellong.dto.JejuProverbDTO;
import com.c205.pellongpellong.entity.JejuProverb;
import com.c205.pellongpellong.repository.JejuProverbRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JejuProverbService {
    private final JejuProverbRepository jejuProverbRepository;

    public JejuProverbDTO getJejuProverb(Long jejuProverbId) {
        JejuProverb jejuProverb = jejuProverbRepository.findById(jejuProverbId)
                .orElseThrow(() -> new IllegalArgumentException("not found: " + jejuProverbId));
        return new JejuProverbDTO(jejuProverb.getJejuProverbId(), jejuProverb.getPbJeju(), jejuProverb.getPbStandard());
    }
}
