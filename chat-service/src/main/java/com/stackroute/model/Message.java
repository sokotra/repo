package com.stackroute.model;

import java.time.LocalDateTime;

public class Message {
	
	private String fromId;
	private String toId;
	private String messages;
	private LocalDateTime currentDateTime;
	
	@Override
	public String toString() {
		return "Message [fromId=" + fromId + ", toId=" + toId + ", messages=" + messages + ", currentDateTime="
				+ currentDateTime + "]";
	}
	public Message() {
		super();
	}
	public Message(String fromId, String toId, String messages, LocalDateTime currentDateTime) {
		super();
		this.fromId = fromId;
		this.toId = toId;
		this.messages = messages;
		this.currentDateTime = currentDateTime;
	}
	public String getFromId() {
		return fromId;
	}
	public void setFromId(String fromId) {
		this.fromId = fromId;
	}
	public String getToId() {
		return toId;
	}
	public void setToId(String toId) {
		this.toId = toId;
	}
	public String getMessages() {
		return messages;
	}
	public void setMessages(String messages) {
		this.messages = messages;
	}
	public LocalDateTime getCurrentDateTime() {
		return currentDateTime;
	}
	public void setCurrentDateTime(LocalDateTime currentDateTime) {
		this.currentDateTime = currentDateTime;
	}

}
