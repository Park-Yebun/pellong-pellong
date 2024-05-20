package com.c205.pellongpellong.service;

import com.c205.pellongpellong.dto.ExpDTO;
import com.c205.pellongpellong.dto.PlayerDTO;
import com.c205.pellongpellong.entity.Exp;
import com.c205.pellongpellong.entity.Member;
import com.c205.pellongpellong.repository.ExpRepository;
import com.c205.pellongpellong.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpService {

    private final ExpRepository expRepository;
    private final MemberRepository memberRepository;
    private final RedisTemplate<String, String> redisTemplate;
    public List<ExpDTO> getExpByMemberId(Long memberId) {
        // ExpRepository를 사용하여 memberId에 해당하는 Exp 데이터를 가져옴
        List<Exp> expList = expRepository.findByMember_MemberId(memberId);

        // Exp 데이터를 ExpDTO로 변환하여 반환
        return expList.stream()
                .map(exp -> new ExpDTO(
                        exp.getExpId(),
                        exp.getMemberId(),
                        exp.getExp(),
                        exp.getExpName(),
                        exp.getExpAt()
                ))
                .collect(Collectors.toList());
    }

    public void addExp(long myId, String expName, int expValue) {
        Member member = memberRepository.findById(myId)
                .orElseThrow(() -> new RuntimeException("해당 memberId에 해당하는 회원이 존재하지 않습니다."));
        Exp exp = Exp.builder()
                .member(member)
                .exp(expValue)
                .expName(expName)
                .expAt(LocalDateTime.now())
                .build();
        //redis에 data 전송
        redisTemplate.opsForZSet().incrementScore("ranking", String.valueOf(member.getMemberId()), expValue);
        expRepository.save(exp);
    }

    public void addPlayersExp(List<PlayerDTO> players, String expName) {
        for (PlayerDTO player : players) {
            Member member = memberRepository.findById(player.getPlayerId())
                    .orElseThrow(() -> new RuntimeException("해당 playerId에 해당하는 회원이 존재하지 않습니다."));
            Exp exp = Exp.builder()
                    .member(member)
                    .exp(player.getPlayerExp())
                    .expName(expName)
                    .expAt(LocalDateTime.now())
                    .build();
            //redis에 data 전송
//            redisTemplate.opsForZSet().add("ranking", myJson, player.getPlayerExp());
            redisTemplate.opsForZSet().incrementScore("ranking", String.valueOf(member.getMemberId()), player.getPlayerExp());
            expRepository.save(exp);
        }
    }


}
