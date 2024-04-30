package com.c205.pellongpellong.service;

import com.c205.pellongpellong.dto.ExpDTO;
import com.c205.pellongpellong.entity.Exp;
import com.c205.pellongpellong.repository.ExpRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpService {

    private final ExpRepository expRepository;

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

}
