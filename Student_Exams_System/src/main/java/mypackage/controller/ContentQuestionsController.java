package mypackage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import mypackage.model.Content_questions;
import mypackage.services.ContentQuestionServices;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "*",methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE},allowedHeaders = "*")
public class ContentQuestionsController {

	@Autowired
	ContentQuestionServices cont_que_serv;
	
	@GetMapping("contentquestions")
	public List<Content_questions> getAllContentQue(){
		return cont_que_serv.getAllContentQuestions();
	}
	
	
	@GetMapping("contentquestion/{id}")
	public Content_questions getContentQueById(@PathVariable int id){
		return cont_que_serv.getContentQuestionsById(id);
	}
	
//	to get topic wise questions
	@GetMapping("questions/{id}")
	public List<Content_questions> getTopicWiseQuestions(@PathVariable int id){
		return cont_que_serv.getTopicQuestions(id);
	}
	
	
	@GetMapping("contentwisequestion/{id}")
	public List<Content_questions> getContentWiseQuestions(@PathVariable int id){
		System.out.println("hello");
		return cont_que_serv.getContentWiseQuestions(id);
	}
	
//	get question id wise content and topic
	@GetMapping("questionwisecontenttopic/{id}")
	public Content_questions getQuestionContentTopic(@PathVariable int id){
		return cont_que_serv.getQuestionWiseContentAndTopic(id);
	}
	
	@PostMapping("contentquestion")
	public String addContentQuestion(@RequestBody Content_questions cont_que) {
		return cont_que_serv.addContentQue(cont_que);
	}
	
	@DeleteMapping("contentquestion/{id}")
	public String deleteContentQuestion(@PathVariable int id) {
		return cont_que_serv.deleteContQue(id);
	}
}
