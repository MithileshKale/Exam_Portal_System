package mypackage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mypackage.model.Exam_questions;

@Repository
public interface IExameQueRepo extends JpaRepository<Exam_questions, Integer> {

}
