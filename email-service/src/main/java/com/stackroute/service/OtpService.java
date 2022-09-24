package com.stackroute.service;

public interface OtpService {

    boolean sendOtp(String emailId);

    boolean verifyOtp(String emailId, int otp);
}
