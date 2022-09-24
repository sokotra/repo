package com.stackroute.RMQ;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Producer {

    @Autowired
    private RabbitTemplate template;

    public void sendDetailsToQueue(UserDTO userDTO) {
        template.convertAndSend(Config.EXCHANGE, Config.ROUTING_KEY, userDTO);
    }

}
