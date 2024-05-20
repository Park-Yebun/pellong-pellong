package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.entity.Drama;
import com.c205.pellongpellong.service.DramaService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class DramaController {
    @Autowired
    private DramaService dramaService;

    @GetMapping("/drama")
    public ResponseEntity<List<Drama>> getAllDramasContents() {
        List<Drama> dramas = dramaService.getAllDramasContents();
        return ResponseEntity.ok(dramas);
    }
}
