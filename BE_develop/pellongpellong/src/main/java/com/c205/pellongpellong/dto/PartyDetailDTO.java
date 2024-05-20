package com.c205.pellongpellong.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class PartyDetailDTO {
    private Long partyId;
    private String partyName;
    private int kind;
    private int po; // 현재 입장 인원
    private int to; // 최대 입장 인원
    private Boolean isPublic;
    private Long hostId;
    private List<GuestDTO> guests;

    // Constructor, Getters and Setters

    public PartyDetailDTO(Long partyId, String partyName, int kind, int po, int to, Boolean isPublic,
                          Long hostId, List<GuestDTO> guests) {
        this.partyId = partyId;
        this.partyName = partyName;
        this.kind = kind;
        this.po = po;
        this.to = to;
        this.isPublic = isPublic;
        this.hostId = hostId;
        this.guests = guests;
    }
}