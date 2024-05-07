package com.c205.pellongpellong.service;

import com.c205.pellongpellong.dto.ShadowingClipDTO;
import com.c205.pellongpellong.entity.ShadowingClip;
import com.c205.pellongpellong.repository.ShadowingClipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service // 빈에 서비스 등록
@RequiredArgsConstructor // final 또는  @NotNull 이 붙는 필드의 생성자 생성
public class ShadowingClipService {
    private final ShadowingClipRepository shadowingClipRepository; // 레포지토리 주입

    public List<ShadowingClipDTO> getAllShadowingClip() {
        List<ShadowingClip> shadowingClips = shadowingClipRepository.findAll(); // 모든 ShadowingClip 조회
        List<ShadowingClipDTO> shadowingClipDTOs = shadowingClips.stream()
                .map(shadowingClip -> shadowingClip.of(shadowingClip))
                .toList();

        return shadowingClipDTOs;


    }
}
