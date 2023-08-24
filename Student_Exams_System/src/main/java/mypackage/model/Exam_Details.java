package mypackage.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="exam_detail_tbl")
public class Exam_Details {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int exam_id;
	private String exame_date;
	private String start_time;
	private String end_time;
	
	
	@OneToMany(mappedBy = "exam_details",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	@JsonIgnoreProperties("exam_details")
	private Set<Exam_questions> exame_questions;
	
	@ManyToOne(fetch = FetchType.LAZY,optional = false)
	@JoinColumn(name="student_id",nullable = false)
	private Student_Details students_details;
	
	

	public Exam_Details() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Exam_Details(int exam_id, String exame_date, String start_time, String end_time,
			Set<Exam_questions> exame_questions, Student_Details students_details) {
		super();
		this.exam_id = exam_id;
		this.exame_date = exame_date;
		this.start_time = start_time;
		this.end_time = end_time;
		this.exame_questions = exame_questions;
		this.students_details = students_details;
	}

	public int getExam_id() {
		return exam_id;
	}

	public void setExam_id(int exam_id) {
		this.exam_id = exam_id;
	}

	public String getExame_date() {
		return exame_date;
	}

	public void setExame_date(String exame_date) {
		this.exame_date = exame_date;
	}

	public String getStart_time() {
		return start_time;
	}

	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}

	public String getEnd_time() {
		return end_time;
	}

	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}

	public Set<Exam_questions> getExame_questions() {
		return exame_questions;
	}

	public void setExame_questions(Set<Exam_questions> exame_questions) {
		this.exame_questions = exame_questions;
	}

	public Student_Details getStudents_details() {
		return students_details;
	}

	public void setStudents_details(Student_Details students_details) {
		this.students_details = students_details;
	}
	
	

	
	
}
