package mypackage.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="student_tbl")
public class Student_Details {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int student_id;
	private String student_name;
	private String qualification;
	private String mobile;
	private String email;
	private String city;
	private String password;
	@OneToMany(mappedBy = "students_details",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	@JsonIgnoreProperties("students_details")
	private Set<Exam_Details> exame_details;
	
	
	public Student_Details() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Student_Details(int student_id, String student_name, String qualification, String mobile, String email,
			String city, String password, Set<Exam_Details> exame_details) {
		super();
		this.student_id = student_id;
		this.student_name = student_name;
		this.qualification = qualification;
		this.mobile = mobile;
		this.email = email;
		this.city = city;
		this.password = password;
		this.exame_details = exame_details;
	}
	public int getStudent_id() {
		return student_id;
	}
	public void setStudent_id(int student_id) {
		this.student_id = student_id;
	}
	public String getStudent_name() {
		return student_name;
	}
	public void setStudent_name(String student_name) {
		this.student_name = student_name;
	}
	public String getQualification() {
		return qualification;
	}
	public void setQualification(String qualification) {
		this.qualification = qualification;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Set<Exam_Details> getExame_details() {
		return exame_details;
	}
	public void setExame_details(Set<Exam_Details> exame_details) {
		this.exame_details = exame_details;
	}
	
}
