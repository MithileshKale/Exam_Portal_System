package mypackage.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mypackage.model.Content_questions;
import mypackage.model.Contents;
import mypackage.model.Topics;
import mypackage.repository.ITopic_repository;
import mypackage.repository.IcontentQuestionRepo;

@Service
public class ContentQuestionServices {

	@Autowired
	IcontentQuestionRepo cont_q_repo;

	@Autowired
	ITopic_repository topic_repo;

	public List<Content_questions> getAllContentQuestions() {
		List<Content_questions> lst = new ArrayList<Content_questions>();
		for (Content_questions c_q : cont_q_repo.findAll()) {
			Topics t = topic_repo.getOne(c_q.getContents().getTopics().getTopic_id());
			Topics tt = new Topics(t.getTopic_id(), t.getTopic_name(), null);
			Contents c = new Contents(c_q.getContents().getContent_id(), c_q.getContents().getContent_name(), null, tt);
			c_q.setContents(c);
			c_q.setExam_questions(null);
			lst.add(c_q);
		}
		return lst;
	}

	public Content_questions getContentQuestionsById(int id) {
		Content_questions c_q = cont_q_repo.findById(id).get();
		Topics t= new Topics(c_q.getContents().getTopics().getTopic_id(), c_q.getContents().getTopics().getTopic_name(), null);
		Contents cont = new Contents(c_q.getContents().getContent_id(), c_q.getContents().getContent_name(), null, t);
		Content_questions obj = new Content_questions(c_q.getQuestion_id(),c_q.getQuestion(), c_q.getOption1(), c_q.getOption2(), c_q.getOption3(), c_q.getOption4(), c_q.getCorrect_option(), c_q.getQuestion_level(),null,cont);
	
		return obj;
	}

//	to get topic wise content 
	
	public List<Content_questions> getTopicQuestions(int id){
		List<Content_questions> lst= new ArrayList<Content_questions>();
		List<Content_questions> questionslst= new ArrayList<Content_questions>();
		Random num= new Random();
		for(Content_questions que:cont_q_repo.findAll()) {
			if(que.getContents().getTopics().getTopic_id()==id) {
				Topics t= new Topics(que.getContents().getTopics().getTopic_id(), que.getContents().getTopics().getTopic_name(), null);
				Contents c= new Contents(que.getContents().getContent_id(), que.getContents().getContent_name(), null, t);
				Content_questions question=new Content_questions(que.getQuestion_id(), que.getQuestion(), que.getOption1(), que.getOption2(), que.getOption3(), que.getOption4(), que.getCorrect_option(), que.getQuestion_level(), null, c);

				lst.add(question);
			}
		}
		int size=lst.size();
		int i=1;
		while(true) {
			 if(questionslst.size()>=10||i>size) {
				  break;
			 }else {
				 int queid=num.nextInt(size);
				 System.out.println(queid);
				 Content_questions obj=lst.get(queid);
				 if(!questionslst.contains(obj)) {
					 questionslst.add(obj);
					 i++;
				 }
			 }
		}
		return questionslst;
	}
	public String addContentQue(Content_questions cont_que) {
		cont_q_repo.save(cont_que);
		return cont_que.getQuestion() + "\n 1." + cont_que.getOption1() + ".\n 2." + cont_que.getOption2() + ".\n 3."
				+ cont_que.getOption3() + ".\n 4." + cont_que.getOption4() + "\ncorrect option =>"
				+ cont_que.getCorrect_option();
	}

	public List<Content_questions> getContentWiseQuestions(int id) {
		List<Content_questions> lst = new ArrayList<Content_questions>();
		for (Content_questions c_q : cont_q_repo.findAll()) {
			if (id == c_q.getContents().getContent_id()) {
				Content_questions obj = new Content_questions(c_q.getQuestion_id(),c_q.getQuestion(), c_q.getOption1(), c_q.getOption2(), c_q.getOption3(), c_q.getOption4(), c_q.getCorrect_option(), c_q.getQuestion_level(),null,null);

				lst.add(obj);
			}
		}
		return lst;
	}

//	Question id wise all question content and topic information
	public Content_questions getQuestionWiseContentAndTopic(int id) {

		Content_questions obj = cont_q_repo.getOne(id);
		 
//		to cancel topic circular reference
		Topics t= new Topics(obj.getContents().getTopics().getTopic_id(), obj.getContents().getTopics().getTopic_name(), null);
		
//		to cancel content circular reference
		Contents c= new Contents(obj.getContents().getContent_id(), obj.getContents().getContent_name(), null, t);
		
//		to cancel content question circular reference
		Content_questions cq = new Content_questions(obj.getQuestion_id(),obj.getQuestion(), obj.getOption1(), obj.getOption2(), obj.getOption3(), obj.getOption4(), obj.getCorrect_option(), obj.getQuestion_level(),null,c);
		
		return cq;
		
		
	}

	public String deleteContQue(int id) {
		Content_questions obj = cont_q_repo.findById(id).get();
		String que = obj.getQuestion();
		cont_q_repo.delete(obj);
		return "question deleted => " + que;
	}
}
