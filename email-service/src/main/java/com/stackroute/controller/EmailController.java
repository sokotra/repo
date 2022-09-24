package com.stackroute.controller;

import com.stackroute.model.Email;
import com.stackroute.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin("*")
@RequestMapping("/api/v6")
public class EmailController {

    ResponseEntity responseEntity;

    @Autowired
    private EmailService emailService;

    @PostMapping("/email")
    public ResponseEntity<?> sendEmail(@RequestBody Email email) {
        boolean flag = emailService.sendEmail(email.getTo(),email.getBody());
        if (flag == true) {
            responseEntity = new ResponseEntity<>(" Email sent Successfully", HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity<>(" Email not Sent..", HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }
}

