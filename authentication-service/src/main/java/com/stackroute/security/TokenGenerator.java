package com.stackroute.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.stackroute.model.Client;
import com.stackroute.service.AuthenticationServiceImpl;
import com.stackroute.service.CustomClientDetailsService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class TokenGenerator {

	@Autowired
	private CustomClientDetailsService service;
	
	@Autowired
	AuthenticationServiceImpl authservice;
	
	private String SECRET_KEY = "secret";
	
	    static final String TOKEN_PREFIX = "Bearer";
	
	    //Token generation method 
	public Map<String, String> generateToken(Client client){
		Client client1 = authservice.getUserByUserEmailAndPassword(client.getEmailId(), client.getPassword());
		String token = Jwts.builder().setSubject(client.getEmailId()).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis()+ 1000 * 60 * 60 * 10))
				.signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
		Map<String,String> map = new HashMap<>();
		map.put("role", client1.getClientrole().name());
        map.put("token",token);
        return map;
				
	}
	public boolean validateToken(String authToken, CustomClientDetailsService details) {

        Jwts.parser().setSigningKey(this.SECRET_KEY).parseClaimsJws(authToken).getBody();
        return true;
    }

    
    public String extractClientEmail(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getSubject();
    }
    
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = service.loadUserByUsername(extractClientEmail(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }
}