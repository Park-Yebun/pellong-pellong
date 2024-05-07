package com.c205.pellongpellong.service;

import com.c205.pellongpellong.dto.MyInfoRankDTO;
import com.c205.pellongpellong.dto.ProfileRankDTO;
import com.c205.pellongpellong.dto.RankDTO;
import com.c205.pellongpellong.entity.Rank;
import com.c205.pellongpellong.repository.RankRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RankService {

    private final RankRepository rankRepository;

    public MyInfoRankDTO getMyInfoRank(long memberId){
        Rank rank = rankRepository.findById(memberId).orElseThrow(() -> new RuntimeException("User not found"));
        return new MyInfoRankDTO(rank.getSumExp());

    }

    public ProfileRankDTO getProfileRank(long memberId){
        Rank rank = rankRepository.findById(memberId).orElseThrow(() -> new RuntimeException("User not found"));
        return new ProfileRankDTO(rank.getSumExp());
    }

    public List<RankDTO> getAllRank() {
        List<Rank> ranks = rankRepository.findAll();  // 모든 Rank 조회
        List<RankDTO> rankDTOs = ranks.stream()
                .map(rank -> rank.of(rank))
                .toList();

        return rankDTOs;
    }

}
