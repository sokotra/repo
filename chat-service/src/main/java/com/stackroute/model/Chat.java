package com.stackroute.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Chat {
	
	public Chat(String chatId, String vendorEmailId, String clientEmailId, List<Message> list) {
		super();
		this.chatId = chatId;
		
		this.vendorEmailId = vendorEmailId;
		this.clientEmailId = clientEmailId;
		this.list = list;
	}
	public Chat(String clientEmailId, String vendorEmailId, List<Message> list) {
		super();
		
		this.clientEmailId = clientEmailId;
		this.vendorEmailId = vendorEmailId;
		this.list = list;
	}
	public Chat() {
		super();
	}
	@Id
	private String chatId;
	
	private String vendorEmailId;
	private String clientEmailId;
	private List<Message> list;
	
	public String getChatId() {
		return chatId;
	}
	public void setChatId(String chatId) {
		this.chatId = chatId;
	}
	public String getVendorEmailId() {
		return vendorEmailId;
	}
	public void setVendorEmailId(String vendorEmailId) {
		this.vendorEmailId = vendorEmailId;
	}
	public String getClientEmailId() {
		return clientEmailId;
	}
	public void setClientEmailId(String clientEmailId) {
		this.clientEmailId = clientEmailId;
	}
	public List<Message> getList() {
		return list;
	}
	public void setList(List<Message> list) {
		this.list = list;
	}
	@Override
	public String toString() {
		return "Chat [chatId=" + chatId + ", vendorEmailId=" + vendorEmailId + ", clientEmailId="
				+ clientEmailId + ", list=" + list + "]";
	}
}
