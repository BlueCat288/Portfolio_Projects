package com.ex.yelpBackend.repository;

import com.ex.yelpBackend.model.Bookmark;
import com.ex.yelpBackend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkRepository extends MongoRepository<Bookmark, String> {
    @Query("{ 'username' : { $regex: ?0 } }")
    public List<Bookmark> findAllByUsername(String username);


}
