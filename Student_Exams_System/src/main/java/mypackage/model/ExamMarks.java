package mypackage.model;

public class ExamMarks {

	private String examQuestion;
	private int submited_opt;
	private int correct_opt;
	private int marks;
	
	
	public ExamMarks() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ExamMarks(String examQuestion, int submited_opt, int correct_opt, int marks) {
		super();
		this.examQuestion = examQuestion;
		this.submited_opt = submited_opt;
		this.correct_opt = correct_opt;
		this.marks = marks;
	}
	public String getExamQuestion() {
		return examQuestion;
	}
	public void setExamQuestion(String examQuestion) {
		this.examQuestion = examQuestion;
	}
	public int getSubmited_opt() {
		return submited_opt;
	}
	public void setSubmited_opt(int submited_opt) {
		this.submited_opt = submited_opt;
	}
	public int getCorrect_opt() {
		return correct_opt;
	}
	public void setCorrect_opt(int correct_opt) {
		this.correct_opt = correct_opt;
	}
	public int getMarks() {
		return marks;
	}
	public void setMarks(int marks) {
		this.marks = marks;
	}
	
	
}
