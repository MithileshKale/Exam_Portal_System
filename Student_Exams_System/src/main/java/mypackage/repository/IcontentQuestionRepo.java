package mypackage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mypackage.model.Content_questions;

@Repository

public interface IcontentQuestionRepo extends JpaRepository<Content_questions, Integer> {

}
