package com.stackroute.controller;

import com.stackroute.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin("*")
@RequestMapping("/api/v6")
public class OtpController {

    @Autowired
    private OtpService otpService;

    ResponseEntity responseEntity;

    @PostMapping("/sendOtp")
    public ResponseEntity<?> sendOtp(@RequestParam String emailId) {

            boolean flag = otpService.sendOtp(emailId);

            if (flag == true) {
                responseEntity = new ResponseEntity<>("Otp sent", HttpStatus.OK);
            } else {
                responseEntity = new ResponseEntity<>("Check your emailId", HttpStatus.BAD_REQUEST);
            }

        return responseEntity;
    }

    @PostMapping("/verifyOtp")
    public ResponseEntity<?> verifyOtp(@RequestParam String emailId, @RequestParam Integer otp) {

        boolean flag = otpService.verifyOtp(emailId,otp);

        if(flag == true){
            responseEntity = new ResponseEntity<>("Otp verified",HttpStatus.OK);
        }

        else{
            responseEntity = new ResponseEntity<>("Wrong Otp Entered",HttpStatus.BAD_REQUEST);
        }

        return responseEntity;
    }
}