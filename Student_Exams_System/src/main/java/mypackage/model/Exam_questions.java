package mypackage.model;


import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="exam_questions_tbl")
public class Exam_questions {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int exam_question_id;
	private int submited_option_number;
	
	@ManyToOne(fetch = FetchType.LAZY,optional = false)
	@JoinColumn(name="question_id",nullable = false)
	private Content_questions content_questions;
	
	@ManyToOne(fetch = FetchType.LAZY,optional = false)
	@JoinColumn(name="exam_id",nullable = false)
	private Exam_Details exam_details;

	
	public Exam_questions() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Exam_questions(int exam_question_id, int submited_option_number, Content_questions content_questions,
			Exam_Details exam_details) {
		super();
		this.exam_question_id = exam_question_id;
		this.submited_option_number = submited_option_number;
		this.content_questions = content_questions;
		this.exam_details = exam_details;
	}

	public int getExam_question_id() {
		return exam_question_id;
	}

	public void setExam_question_id(int exam_question_id) {
		this.exam_question_id = exam_question_id;
	}

	public int getSubmited_option_number() {
		return submited_option_number;
	}

	public void setSubmited_option_number(int submited_option_number) {
		this.submited_option_number = submited_option_number;
	}

	public Content_questions getContent_questions() {
		return content_questions;
	}

	public void setContent_questions(Content_questions content_questions) {
		this.content_questions = content_questions;
	}

	public Exam_Details getExam_details() {
		return exam_details;
	}

	public void setExam_details(Exam_Details exam_details) {
		this.exam_details = exam_details;
	}
	
	
	
}
