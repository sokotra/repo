package com.stackroute.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import lombok.Data;

	@Configuration
	@Data
	@ConfigurationProperties(prefix = "razorpay")
	public class RazorPayClientConfig {
	    private String key_id;
	    private String key_secret;
		public String getKey_id() {
			return key_id;
		}
		public void setKey_id(String key_id) {
			this.key_id = key_id;
		}
		public String getKey_secret() {
			return key_secret;
		}
		public void setKey_secret(String key_secret) {
			this.key_secret = key_secret;
		}
	    
		
	}
	

