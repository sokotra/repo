package com.stackroute.service;

import java.util.List;

import com.stackroute.model.Chat;
import com.stackroute.model.Message;

public interface ChatService {

	Chat addMessages(Message message) throws Exception;
	List<String> getAllVendors(String clientEmailId) throws Exception;
	List<String> getAllClients(String vendorEmailId) throws Exception;
	List<Message> getAllMessages(String clientEmailId, String vendorEmailId);
}
