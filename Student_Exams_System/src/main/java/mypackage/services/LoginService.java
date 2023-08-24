package mypackage.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mypackage.model.LoginDetails;
import mypackage.model.Student_Details;
import mypackage.repository.IStudentRepo;

@Service
public class LoginService {

	@Autowired
	IStudentRepo student_repo;

	public Student_Details isUserExist(LoginDetails login) {
		
		Student_Details stud=null;

			for(Student_Details student:student_repo.findAll()) {
				if((student.getEmail()).equals(login.getUsername())&&((student.getPassword()).equals(login.getPassword()))) {
					Student_Details s= new Student_Details(student.getStudent_id(), student.getStudent_name(), student.getQualification(), student.getMobile(), student.getEmail(), student.getCity(),null, null);
					stud=s;
					break;
				}
			}

		
		System.out.println("hell");
		return stud;
	}
}
