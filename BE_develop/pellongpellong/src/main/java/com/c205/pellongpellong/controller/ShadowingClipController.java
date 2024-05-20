package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.dto.ShadowingClipDTO;
import com.c205.pellongpellong.service.ShadowingClipService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // HTTP Request Body 에 객체 데이터를 직렬화하여 전송하거나, HTTP Response Body에 객체 데이터를 직렬화하여 전송할 수 있게 해주는 어노테이션
@RequiredArgsConstructor
public class ShadowingClipController { //step5
    private final ShadowingClipService shadowingClipService;

    @GetMapping("/shadowing")
    public List<ShadowingClipDTO> getAllShadowingClip() {
        return shadowingClipService.getAllShadowingClip();
    }

}

