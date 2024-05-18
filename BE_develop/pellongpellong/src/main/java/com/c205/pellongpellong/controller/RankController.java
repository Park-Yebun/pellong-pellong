package com.c205.pellongpellong.controller;


import com.c205.pellongpellong.dto.RankDTO;
import com.c205.pellongpellong.entity.Member;
import com.c205.pellongpellong.entity.Rank;
import com.c205.pellongpellong.repository.RankRepository;
import com.c205.pellongpellong.repository.MemberRepository;
import com.c205.pellongpellong.service.RankService;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RankController {

    private final RankRepository rankRepository;

    private final MemberRepository memberRepository;
    private final RankService rankService;
    private final RedisTemplate<String, String> redisTemplate;
    @PostMapping("/ranking/{memberId}")
    public ResponseEntity<String> addRank(@PathVariable long memberId) {
        // memberId를 사용하여 member 엔티티를 조회
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("해당 memberId에 해당하는 회원이 존재하지 않습니다."));

        // 조회된 member 엔티티의 nickname을 가져와서 Rank 엔티티 생성
        Rank rank = Rank.builder()
                .member(member)
                .sumExp(0)
                .nickname(member.getNickname())
                .build();

        // Rank 엔티티를 저장
        rankRepository.save(rank);

        // 성공적으로 저장되었다는 메시지 반환
        return ResponseEntity.status(HttpStatus.CREATED).body("Rank 테이블에 memberId " + memberId + "의 레코드가 추가되었습니다.");

    }

    @GetMapping("/ranking")
    public List<RankDTO> getAllRank() {return rankService.getAllRankInRedis();}

    @DeleteMapping("/ranking/{memberId}")
    public void deleteRank(@PathVariable long memberId) {
       redisTemplate.opsForZSet().remove("ranking", String.valueOf(memberId));
    }
}
