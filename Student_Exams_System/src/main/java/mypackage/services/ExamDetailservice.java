package mypackage.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mypackage.model.ExamMarks;
import mypackage.model.Exam_Details;
import mypackage.model.Exam_questions;
import mypackage.repository.IExameDetailsRepo;
import mypackage.repository.IExameQueRepo;

@Service
public class ExamDetailservice {
	@Autowired
	IExameDetailsRepo erepo;

	@Autowired
	IExameQueRepo querepo;

	public String addDetails(Exam_Details details) {
		Exam_Details obj = new Exam_Details(0, details.getExame_date(), details.getStart_time(), details.getEnd_time(),
				null, details.getStudents_details());
		Exam_Details id=erepo.save(obj);
		System.out.println(id);
		for (Exam_questions e : details.getExame_questions()) {
			System.out.println("hello");
			Exam_questions questions = new Exam_questions(0, e.getSubmited_option_number(),e.getContent_questions(), id);
			querepo.save(questions);
		}
		return "Submited Successfully";
	}
	
	public List<Exam_Details> getallExams(int id){
		List<Exam_Details> lst = new ArrayList<Exam_Details>();
		for(Exam_Details e:erepo.findAll()) {
			if(e.getStudents_details().getStudent_id()==id) {
				Exam_Details obj = new Exam_Details(e.getExam_id(), e.getExame_date(), e.getStart_time(), e.getEnd_time(), null, null);
				lst.add(obj)
;			}
		}
		return lst;
	}
	
	public List<ExamMarks> getExamMarksByExamId(int id){
		List<ExamMarks> lst = new ArrayList<ExamMarks>();
		for(Exam_questions e:querepo.findAll()) {
			if(e.getExam_details().getExam_id()==id) {
				int selected_opt=e.getSubmited_option_number();
				int correct_opt=e.getContent_questions().getCorrect_option();
				int marks=0;
				if(selected_opt==correct_opt) {
					marks=1;
				}
				ExamMarks obj= new ExamMarks(e.getContent_questions().getQuestion(), selected_opt, correct_opt, marks);
				lst.add(obj);
			}
		}
		return lst;
	}
}
