package com.stackroute.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.model.Rating;

@Repository
public interface RatingRepository extends MongoRepository<Rating, String>  {

}
