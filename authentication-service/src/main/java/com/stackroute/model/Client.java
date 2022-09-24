package com.stackroute.model;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;

@Entity
public class Client{
     
	 @Id
	private String emailId;
    private String password;
    @Enumerated(EnumType.STRING)
    private ClientRole clientrole;

	public Client() {
		super();
	}
	public Client(String emailId, String password, ClientRole clientrole) {
		super();
		this.emailId = emailId;
		this.password = password;
		this.clientrole = clientrole;
	}
	
	public Client(String emailId, String password) {
		this.emailId = emailId;
		this.password = password;
	}

	@Override
	public String toString() {
		return "Client [emailId=" + emailId + ", password=" + password + ", clientrole=" + clientrole + "]";
	}

	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public ClientRole getClientrole() {
		return clientrole;
	}
	public void setClientrole(ClientRole clientrole) {
		this.clientrole = clientrole;
	}
	
	}
	
	
	
	
	
	
	
	
	

