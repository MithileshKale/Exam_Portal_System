package mypackage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mypackage.model.Exam_Details;

@Repository
public interface IExameDetailsRepo extends JpaRepository<Exam_Details, Integer> {

}
