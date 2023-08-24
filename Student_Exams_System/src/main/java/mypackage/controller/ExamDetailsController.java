package mypackage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import mypackage.model.ExamMarks;
import mypackage.model.Exam_Details;
import mypackage.services.ExamDetailservice;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*",methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE},allowedHeaders = "*")
public class ExamDetailsController {
	@Autowired
	ExamDetailservice eserv;
	
	@PostMapping("examdetails")
	public String addDetails(@RequestBody Exam_Details details) {
		System.out.println(details.getExame_date());
		return eserv.addDetails(details);
	}
	
	@GetMapping("examdetails/{id}")
	public List<Exam_Details> getExamsById(@PathVariable int id){
		return eserv.getallExams(id);
	}
	
	@GetMapping("exammarks/{id}")
	public List<ExamMarks> getExamMarks(@PathVariable int id){
		return eserv.getExamMarksByExamId(id);
	}

}
