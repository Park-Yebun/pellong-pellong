package com.c205.pellongpellong.controller;

import com.c205.pellongpellong.dto.GameResultDTO;
import com.c205.pellongpellong.dto.GameResultListDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;

@Controller
public class WebsocketController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/other-game/{partyId}/correct")
    public void correct(@DestinationVariable Long partyId, @Payload Map<String, Object> payload) {
        Long playerId = ((Number) payload.get("playerId")).longValue();

        Map<String, Object> message = Map.of(
                "type", "correct",
                "playerId", playerId
        );

        messagingTemplate.convertAndSend("/topic/party/" + partyId, message);
    }

    @MessageMapping("/other-game/{partyId}/wrong")
    public void wrong(@DestinationVariable Long partyId, @Payload Map<String, Object> payload) {
        Long playerId = ((Number) payload.get("playerId")).longValue();

        Map<String, Object> message = Map.of(
                "type", "wrong",
                "playerId", playerId
        );

        messagingTemplate.convertAndSend("/topic/party/" + partyId, message);
    }

    @MessageMapping("/other-game/{partyId}/result")
    public void result(@DestinationVariable Long partyId, @Payload GameResultListDTO gameResult) {
        List<GameResultDTO> players = gameResult.getPlayers();

        Map<String, Object> message = Map.of(
                "type", "result",
                "gameResult", players
        );

        messagingTemplate.convertAndSend("/topic/party/" + partyId, message);
    }
}

