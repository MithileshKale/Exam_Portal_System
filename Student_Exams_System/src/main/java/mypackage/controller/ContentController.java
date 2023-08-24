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

import mypackage.model.Contents;
import mypackage.services.ContentService;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "*",methods = {RequestMethod.DELETE,RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT},allowedHeaders = "*")
public class ContentController {

	@Autowired
	ContentService cont_serv;
	
	@GetMapping("contents")
	public List<Contents> getAllContents(){
		return cont_serv.getAllContents();
	}
	
	@GetMapping("content/{id}")
	public Contents getContentById(@PathVariable int id) {
		return cont_serv.getContentById(id);
	}
	
	@GetMapping("topicwisecontent/{id}")
	public List<Contents> getTopicWiseContent(@PathVariable int id){
		return cont_serv.getTopicWiseContent(id);
	}
	
	@PostMapping("content")
	public String addContent(@RequestBody Contents cont) {
		return cont_serv.AddContent(cont);
	}
	
	@DeleteMapping("content/{id}")
	public String deleteContent(@PathVariable int id) {
		return cont_serv.DeleteContent(id);
	}
}
