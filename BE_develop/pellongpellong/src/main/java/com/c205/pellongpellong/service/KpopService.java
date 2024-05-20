package com.c205.pellongpellong.service;
import com.c205.pellongpellong.entity.Kpop;
import com.c205.pellongpellong.repository.KpopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class KpopService {
    @Autowired
    private KpopRepository kpopRepository;

    public List<Kpop> getAllKpopContents() {
        return kpopRepository.findAll();
    }
}