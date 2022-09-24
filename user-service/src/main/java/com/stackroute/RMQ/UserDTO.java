package com.stackroute.RMQ;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDTO {

    private String role;
    private String emailId;
    private String password;

}
