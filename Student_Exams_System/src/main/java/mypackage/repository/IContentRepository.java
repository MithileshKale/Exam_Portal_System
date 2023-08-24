package mypackage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mypackage.model.Contents;

@Repository
public interface IContentRepository extends JpaRepository<Contents, Integer> {

}
