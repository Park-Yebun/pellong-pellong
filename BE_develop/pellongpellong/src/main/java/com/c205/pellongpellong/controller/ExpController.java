package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.dto.ExpDTO;
import com.c205.pellongpellong.service.ExpService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ExpController {

    private final ExpService expService;

    @GetMapping("/profiles/explog/{memberId}")
    public ResponseEntity<List<ExpDTO>> getExpByMemberId(@PathVariable Long memberId) {
        List<ExpDTO> expList = expService.getExpByMemberId(memberId);
        return ResponseEntity.ok(expList);
    }


}
