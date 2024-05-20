package com.c205.pellongpellong.service;

import com.c205.pellongpellong.entity.Drama;
import com.c205.pellongpellong.repository.DramaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DramaService {
    @Autowired
    private DramaRepository dramaRepository;

    public List<Drama> getAllDramasContents() {
        return dramaRepository.findAll();
    }
}
