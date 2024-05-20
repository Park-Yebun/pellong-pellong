package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.entity.Kpop;
import com.c205.pellongpellong.service.KpopService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class KpopController {
    @Autowired
    private KpopService kpopService;

    @GetMapping("/kpop")
    public ResponseEntity<List<Kpop>> getAllKpopContents() {
        List<Kpop> kpopList = kpopService.getAllKpopContents();
        return ResponseEntity.ok(kpopList);
    }
}