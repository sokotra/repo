package com.stackroute.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.model.Chat;
import com.stackroute.model.Message;
import com.stackroute.repository.ChatRepository;

@Service                                                                                                                                                                           
public class ChatServiceImpl implements ChatService {                                                                                  
	                                                                                               
                                                                                                                                                              
	@Autowired
	ChatRepository repository;

	public Chat addMessages(Message message) throws Exception{
		
		String clientEmailId = message.getFromId();
		String vendorEmailId = message.getToId();
		
		if(message.getMessages()==null) {
			throw new Exception();
		}
		
		// When client is sending a message
		List<Chat> list = repository.findByClientEmailIdAndVendorEmailId(clientEmailId, vendorEmailId);
		if(!(list==null || list.size()==0)) {
			//fetch the list of messages
		List<Message> messageList = list.get(0).getList();
		//Add at the zeroth index to make the most recent message at top in list of messsages
		messageList.add(0, message);
	return repository.save(list.get(0));
		}
		else {
			//when vendor is sending a message
			List<Chat> list2 = repository.findByClientEmailIdAndVendorEmailId(vendorEmailId, clientEmailId);
			if(!(list2==null || list2.size()==0)) {
				//fetch the list of messages	
			List<Message> messageList2 = list2.get(0).getList();
			//Add at the zeroth index to make the most recent message at top in list of messsages
			messageList2.add(0, message);
			return repository.save(list2.get(0));
		}
			// At the time of 1st message which should always be from client
            List<Message> list3 = new ArrayList<>();		
            list3.add(0, message);
			Chat chat = new Chat(clientEmailId, vendorEmailId, list3 );
			chat.setChatId(vendorEmailId+clientEmailId);
			return repository.save(chat);
			
	}
}

	@Override
	public List<String> getAllVendors(String clientEmailId) throws Exception {
		//to fetch all the  list of chat objects of a particular client
		List<Chat> list = repository.findByClientEmailId(clientEmailId);
		if(list==null || list.size()==0) {
			throw new Exception();
		}
		
		List<String> result = new ArrayList<>();
		if(!(list==null)) {
			//iterating over the list of chat objects
			for(Chat ch : list) {
				result.add(ch.getVendorEmailId());
				
			}
			
		}
		return result;
		
	}

	@Override
	public List<String> getAllClients(String vendorEmailId) throws Exception {
		//to fetch all the  list of chat objects of a particular vendor
		List<Chat> list1 = repository.findByVendorEmailId(vendorEmailId);
		if(list1==null || list1.size()==0) {
			throw new Exception();
		}
		List<String> result1 = new ArrayList<>();
		if(!(list1==null)) {
			//iterating over the list of chat objects
			for(Chat ch1 : list1) {
				result1.add(ch1.getClientEmailId());
				
			}
		
		}
		return result1;
	}

	@Override
	public List<Message> getAllMessages(String clientEmailId, String vendorEmailId) {
		List<Chat> list = repository.findByClientEmailIdAndVendorEmailId(clientEmailId, vendorEmailId);
			if(!(list==null || list.size()==0)) {
				
				//Collections.reverse(list.get(0).getList());
				return list.get(0).getList();
				
				
			}
			return null;
	}
}
