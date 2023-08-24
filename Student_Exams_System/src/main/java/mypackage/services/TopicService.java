package mypackage.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mypackage.model.Topics;
import mypackage.repository.ITopic_repository;

@Service
public class TopicService {

	@Autowired
	ITopic_repository topic_repo;
	
	public List<Topics> getAllTopics(){
		List<Topics>lst=new ArrayList<Topics>();
		for(Topics t:topic_repo.findAll()) {
			Topics obj=new Topics(t.getTopic_id(), t.getTopic_name(), null);
			lst.add(obj);
		}
		return lst;
	}
	
	
	public Topics getTopicById(int id){
		Topics obj= topic_repo.findById(id).get();
		Topics obj2=new Topics(obj.getTopic_id(), obj.getTopic_name(), null);
		return obj2;
	}
	
	public String AddTopic(Topics topic) {
		topic_repo.save(topic);
		return topic.getTopic_name()+" topic added";
	}
	
	public String updateTopic(Topics t) {
		topic_repo.save(t);
		return "topic "+t.getTopic_name()+" updated";
	}
	
	public String DeleteTopic(int id) {
		Topics topic = topic_repo.findById(id).get();
		String tname=topic.getTopic_name();
		topic_repo.delete(topic);
		return tname+" topic deleted";
	}
}
