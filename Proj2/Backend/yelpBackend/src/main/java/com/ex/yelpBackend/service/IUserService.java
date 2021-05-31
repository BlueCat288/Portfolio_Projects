package com.ex.yelpBackend.service;

import com.ex.yelpBackend.model.User;

import java.util.List;

public interface IUserService {
    List<User> findAll();
    User findOneByUsername(String username);
    void insert(User user);
//    boolean checkExists(String username);
//    boolean validateUser(String username, String password);
}
