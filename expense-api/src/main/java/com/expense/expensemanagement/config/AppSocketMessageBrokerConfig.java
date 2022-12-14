package com.expense.expensemanagement.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.HandshakeInterceptor;


@Configuration
@EnableWebSocketMessageBroker
@EnableWebSocket
public class AppSocketMessageBrokerConfig implements WebSocketMessageBrokerConfigurer {

    @Autowired
    @Qualifier("wSHandshakeInterceptor")
    private HandshakeInterceptor handshakeInterceptor;

    @Autowired
    @Qualifier("connectAuthorizedInterceptor")
    ChannelInterceptor channelInterceptor;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/expense/ws/connect")
                .setAllowedOrigins("http://localhost:3000")
                .addInterceptors(handshakeInterceptor);
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/expense/ws/app") //Destination Header with this will go to controller with @MessageMapping
                .enableSimpleBroker("/expense/ws/topic/broadcast", "/queue/notification", "/queue/count-notification"); //topic: It a Pub-SUB Channel.Queue: direct channel Destination Header with go to controller and resolve with @MessageMapping
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(channelInterceptor);
    }
}
