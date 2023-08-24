package mypackage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mypackage.model.Student_Details;

@Repository
public interface IStudentRepo extends JpaRepository<Student_Details, Integer> {

}
