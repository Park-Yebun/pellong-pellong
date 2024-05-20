package com.c205.pellongpellong.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class GuestRequest {
        private Long partyId;
        private Long memberId;
}
