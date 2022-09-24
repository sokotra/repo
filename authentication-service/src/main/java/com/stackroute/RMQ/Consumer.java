package com.stackroute.RMQ;

import com.stackroute.exception.UserNotFoundException;
import com.stackroute.model.Client;
import com.stackroute.model.ClientRole;
import com.stackroute.service.AuthenticationService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Consumer {

    @Autowired
    AuthenticationService authenticationService;

    @RabbitListener(queues = Config.QUEUE)
    public void consumeMessageFromQueue(UserDTO userDTO) throws UserNotFoundException {
        if(userDTO.getRole().equals("CLIENT")){
            authenticationService.addClient(new Client(userDTO.getEmailId(), userDTO.getPassword(), ClientRole.CLIENT ));
        }
        else{
            authenticationService.addClient(new Client(userDTO.getEmailId(), userDTO.getPassword(), ClientRole.VENDOR ));
        }

    }
}
