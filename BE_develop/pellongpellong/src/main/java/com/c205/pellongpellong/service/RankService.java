package com.c205.pellongpellong.service;

import com.c205.pellongpellong.dto.*;
import com.c205.pellongpellong.entity.Rank;
import com.c205.pellongpellong.repository.RankRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RankService {

    private final RankRepository rankRepository;
    private final RedisTemplate<String, String> redisTemplate;

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

    // 여기서부터 Redis 이용한 랭킹 시스템 메서드
    // 상위 10개의 랭킹을 가져옴, 개수는 추후 커스텀
    public List<RankingDTO> getRankingList() {
        String key = "ranking";
        ZSetOperations<String, String> stringStringZSetOperations = redisTemplate.opsForZSet();
        Set<ZSetOperations.TypedTuple<String>> typedTuples = stringStringZSetOperations.reverseRangeWithScores(key, 0L, 10L);
        List<RankingDTO> collect = typedTuples.stream()
                .map(typedTuple -> new RankingDTO(typedTuple.getValue(), typedTuple.getScore()))
                .collect(Collectors.toList());
        return collect;
    }


    public Long getRank(Long memberId) {
        Long ranking = 0L;
        Double ranking1 = redisTemplate.opsForZSet().score("ranking", memberId);
        Set<String> ranking2 = redisTemplate.opsForZSet().reverseRangeByScore("ranking", ranking1, ranking1, 0, 1);
        for (String s : ranking2) {
            ranking = redisTemplate.opsForZSet().reverseRank("ranking", s);
        }
        return ranking+1;//index가 0부터 시작되어서 1 더해준다
    }
}
