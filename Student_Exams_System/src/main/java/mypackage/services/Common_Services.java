package mypackage.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mypackage.repository.IContentRepository;
import mypackage.repository.IExameQueRepo;
import mypackage.repository.IStudentRepo;
import mypackage.repository.ITopic_repository;
import mypackage.repository.IcontentQuestionRepo;

@Service
public class Common_Services {
	
	@Autowired
	ITopic_repository t_repo;
	
	@Autowired 
	IContentRepository c_repo;
	
	@Autowired
	IcontentQuestionRepo q_repo;
	
	@Autowired
	IStudentRepo s_repo;

	public List<Long> getTotalCount(){
		List<Long> lst=new ArrayList<Long>();
		
		long students=s_repo.count();
		long topic=t_repo.count();
		long content=c_repo.count();
		long questions=q_repo.count();
		lst.add(students);
		lst.add(topic);
		lst.add(content);
		lst.add(questions);
		return lst;
	}
}
