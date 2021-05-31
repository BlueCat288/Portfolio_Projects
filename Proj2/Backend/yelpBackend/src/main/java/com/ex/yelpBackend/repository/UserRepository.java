package com.ex.yelpBackend.repository;

import com.ex.yelpBackend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    @Query("{'username' : ?0}")
    public User findByUsername(String username);


}
