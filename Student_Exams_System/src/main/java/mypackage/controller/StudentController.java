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

import mypackage.model.Student_Details;
import mypackage.services.StudentService;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "*",methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE},allowedHeaders = "*")
public class StudentController {

	@Autowired
	StudentService stud_serv;
	
//	to get all students
	@GetMapping("student")
	public List<Student_Details> getAllStudents(){
		return stud_serv.getAllStudents();
	}
	
//	to get Student by id
	@GetMapping("student/{id}")
	public Student_Details getStudentById(@PathVariable int id) {
		return stud_serv.getStudentById(id);
	}
	
//	To add Student in database 
	@PostMapping("student")
	public boolean addStudent(@RequestBody Student_Details student) {
		return stud_serv.addStudent(student);
	}
	
//	To delete student from database
	@DeleteMapping("student/{id}")
	public String deleteStudent(@PathVariable int id) {
		return stud_serv.deleteStudent(id);
	}
	
//	To update Student Details
	
}
