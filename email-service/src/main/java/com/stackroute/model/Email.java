package com.stackroute.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Email {
    @NotBlank(message = "Email Id is mandatory")
    @Id
    private String to;

    @NotBlank(message = "Content is mandatory")
    private String body;

    private int otp;

    public Email(String to, int otp) {
        this.to = to;
        this.otp = otp;
    }
}
