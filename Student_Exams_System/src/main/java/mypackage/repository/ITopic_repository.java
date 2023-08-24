package mypackage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mypackage.model.Topics;

@Repository
public interface ITopic_repository extends JpaRepository<Topics, Integer> {

}
