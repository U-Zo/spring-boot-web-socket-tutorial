package crackco.wstutorial.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import crackco.wstutorial.domain.ChatMessage;
import crackco.wstutorial.domain.ChatRoom;
import crackco.wstutorial.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
@RequiredArgsConstructor
public class WebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper;
    private final ChatService chatService;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();

        ChatMessage chatMessage = objectMapper.readValue(payload, ChatMessage.class);
        ChatRoom chatRoom = chatService.findByRoomId(chatMessage.getRoomId());
        chatRoom.handleActions(session, chatMessage, chatService);
    }
}
