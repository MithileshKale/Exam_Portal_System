package mypackage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import mypackage.model.Topics;
import mypackage.services.TopicService;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "*",methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE},allowedHeaders = "*")
public class TopicController {

	@Autowired
	TopicService topic_serv;
	
	
	@GetMapping("topic")
	public List<Topics> getAllTopics(){
		return topic_serv.getAllTopics();
	}
	
	@GetMapping("topic/{id}")
	public Topics getTopicById(@PathVariable int id) {
		return topic_serv.getTopicById(id);
	}
	
	
	@PostMapping("topic")
	public String addTopic(@RequestBody Topics topic) {
		return topic_serv.AddTopic(topic);
	}
	
	
//	To update topic 
	@PutMapping("topic")
	public String updateTopic(@RequestBody Topics t) {
		return topic_serv.updateTopic(t);
	}
	
	
	@DeleteMapping("topic/{id}")
	public String deleteTopic(@PathVariable int id) {
		return topic_serv.DeleteTopic(id);
	}
}
