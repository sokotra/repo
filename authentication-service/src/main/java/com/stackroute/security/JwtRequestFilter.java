package com.stackroute.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

@Service
public class JwtRequestFilter extends OncePerRequestFilter {
	
	@Autowired
	TokenGenerator token;
	
	String clientEmailId = null;

	public JwtRequestFilter(TokenGenerator token) {
		this.token = token;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		//Get token from the headers
		 String authorizationHeader = request.getHeader("Authorization");
		
		if(authorizationHeader!=null) {
			//extract token from the headers 
		String jwt = authorizationHeader.substring(7);
		try {
			//extract emailId from token to validate
		 clientEmailId = token.extractClientEmail(jwt);
		 Authentication auth = token.getAuthentication(jwt);
         SecurityContextHolder.getContext().setAuthentication(auth);
         
		}catch (Exception ex) {
            ex.getMessage();	
		}
		}
	
		filterChain.doFilter(request,response);
			
	}

}

