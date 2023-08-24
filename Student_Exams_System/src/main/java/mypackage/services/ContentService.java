package mypackage.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mypackage.model.Contents;
import mypackage.model.Topics;
import mypackage.repository.IContentRepository;

@Service
public class ContentService {

	@Autowired
	IContentRepository content_repo;
	
	public List<Contents> getAllContents(){
		List<Contents>lst=new ArrayList<Contents>();
		for(Contents c:content_repo.findAll()) {
			Topics t=new Topics(c.getTopics().getTopic_id(), c.getTopics().getTopic_name(), null);
			Contents obj =new Contents(c.getContent_id(), c.getContent_name(),null, t);
			lst.add(obj);
		}
		return lst;
	}
	
	
	public Contents getContentById(int id){
		Contents cont=content_repo.findById(id).get();
		Contents obj =new Contents(cont.getContent_id(), cont.getContent_name(),null, null);
		return obj;
	}
	
	
	public List<Contents> getTopicWiseContent(int id){
		List<Contents> lst= new ArrayList<Contents>();
		
//		to cancel circular refference
		for(Contents c:content_repo.findAll()) {
			if(c.getTopics().getTopic_id()==id) {
				Topics t= new Topics(c.getTopics().getTopic_id(), c.getTopics().getTopic_name(), null);
				Contents cont = new Contents(c.getContent_id(), c.getContent_name(), null, t);
				lst.add(cont);
				
			}
		}
		
		return lst;
	}
	
	public String DeleteContent(int id) {
		Contents cont =content_repo.findById(id).get();
		String name=cont.getContent_name();
		content_repo.delete(cont);
		return name+" content deleted ";
	}
	
	
	public String AddContent(Contents cont) {
		content_repo.save(cont);
		return cont.getContent_name()+" content added";
	}
}
