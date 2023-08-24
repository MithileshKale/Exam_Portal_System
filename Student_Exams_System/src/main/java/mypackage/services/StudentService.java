package mypackage.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mypackage.model.Email;
import mypackage.model.Student_Details;
import mypackage.repository.EmailServiceImplementation;
import mypackage.repository.IStudentRepo;

@Service
public class StudentService {

	@Autowired
	IStudentRepo student_repo;
	
	@Autowired EmailServiceImplementation emails;
	
	public List<Student_Details> getAllStudents(){
		List<Student_Details> lst=new ArrayList<Student_Details>();
		for(Student_Details s:student_repo.findAll()) {
			Student_Details obj=new Student_Details(s.getStudent_id(), s.getStudent_name(), s.getQualification(), s.getMobile(), s.getEmail(), s.getCity(), s.getPassword(), null);
			lst.add(obj);
		}
		return lst;
	}
	
	
	public Student_Details getStudentById(int id) {
		Student_Details s= student_repo.findById(id).get();
		s.setExame_details(null);
		return s;
		
	}
	
	public boolean addStudent(Student_Details student) {
		int cnt=0;
		for(Student_Details detail:student_repo.findAll()) {
			if(student.getEmail().equals(detail.getEmail())) {
				cnt++;
				break;
				
			}
		}
		if(cnt==0) {
			String password=getPassword(10);
			student.setPassword(password);
			student_repo.save(student);
			String subject="Your Account created on examination portal";
			String msg="Your email id = "+student.getEmail()+"\n  default password = "+password;
			Email email=new Email(student.getEmail(), subject, msg);
			emails.SimpleEmail(email) ;
			return true;
		}
		else {
			return false;
		}
		
	}
	
	public String getPassword(int size) {
		String data="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		String password="";
		Random r= new Random();
		for (int i = 0; i < size ; i++) {
			char c=data.charAt(r.nextInt(data.length()-1));
			password+=c;
			
		}
		return password;
	}
	
	public String deleteStudent(int id) {
		Student_Details st=student_repo.findById(id).get();
		student_repo.delete(st);
		return "Student Deleted";    
	}
}
