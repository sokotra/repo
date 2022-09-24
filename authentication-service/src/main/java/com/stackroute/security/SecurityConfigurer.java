package com.stackroute.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.EnableGlobalAuthentication;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
@Configuration
@EnableWebSecurity
@EnableGlobalAuthentication
public class SecurityConfigurer extends WebSecurityConfigurerAdapter{
	
	@Autowired
	private TokenGenerator token;
	
	@Autowired
	private JwtRequestFilter filter;
	
     //configuring the security parameters
	 @Override
	    protected void configure(HttpSecurity http) throws Exception {
	       
		 http.csrf().disable()
         .cors().disable().authorizeRequests()
	                .antMatchers("/api/v2/login").
	                permitAll() 
	                .antMatchers("/api/v2/password")
	                .permitAll()
	                .anyRequest().authenticated()
	                .and()
	                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	        filter = new JwtRequestFilter(token);
	        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
	 }
	 
	 
	@Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    
    
    
}
