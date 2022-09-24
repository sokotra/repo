package com.stackroute.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.model.PaymentDetails;


@Repository
public interface PaymentDetailsRepository extends JpaRepository<PaymentDetails, String> {

	
}

