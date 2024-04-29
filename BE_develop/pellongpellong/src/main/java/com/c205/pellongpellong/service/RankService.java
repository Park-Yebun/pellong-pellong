package com.c205.pellongpellong.service;

import com.c205.pellongpellong.dto.MyInfoRankDTO;
import com.c205.pellongpellong.entity.Rank;
import com.c205.pellongpellong.repository.RankRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RankService {

    private final RankRepository rankRepository;

    public MyInfoRankDTO getMyInfoRank(long memberId){
        Rank rank = rankRepository.findById(memberId).orElseThrow(() -> new RuntimeException("User not found"));
        return new MyInfoRankDTO(rank.getSumExp());

    }

}
