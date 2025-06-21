package com.trabalho.EngSoft.Repository;

import com.trabalho.EngSoft.Model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByUserFrom(String userFrom);
    List<Rating> findByUserTo(String userTo);
}
