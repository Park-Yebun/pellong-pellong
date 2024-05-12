package com.c205.pellongpellong.service;

import com.c205.pellongpellong.dto.MyInfoRankDTO;
import com.c205.pellongpellong.dto.PlayerDTO;
import com.c205.pellongpellong.dto.ProfileRankDTO;
import com.c205.pellongpellong.dto.RankDTO;
import com.c205.pellongpellong.entity.Rank;
import com.c205.pellongpellong.repository.RankRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Rank updateSumExp(long myId, int expValue) {
        Rank rank = rankRepository.findByMemberMemberId(myId)
                .orElseThrow(() -> new RuntimeException("해당 memberId에 해당하는 회원의 Rank가 존재하지 않습니다."));
        rank.setSumExp(rank.getSumExp() + expValue);
        return rankRepository.save(rank);
    }

    public void updatePlayersSumExp(List<PlayerDTO> players) {
        for (PlayerDTO player : players) {
            Rank rank = rankRepository.findByMemberMemberId(player.getPlayerId())
                    .orElseThrow(() -> new RuntimeException("해당 memberId에 해당하는 회원의 Rank가 존재하지 않습니다."));
            rank.setSumExp(rank.getSumExp() + player.getPlayerExp());
            rankRepository.save(rank);
        }
    }
}
