package com.ex.yelpBackend.service;

import com.ex.yelpBackend.model.User;
import com.ex.yelpBackend.repository.UserRepository;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@NoArgsConstructor
public class UserService implements IUserService {

    Logger log = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository repository;

    /**
     * @param user new user object.
     */
    @Override
    public void insert(User user) {
        log.info("U service 28");
        this.repository.insert(user);
    }


    /**
     * @return all users.
     */
    @Override
    public List<User> findAll() {
        log.info("U service 35");
        return repository.findAll();
    }

    /**
     * @param username username;
     * @return user under username.
     */
    @Override
    public User findOneByUsername(String username) {
        log.info("U service 41");
        return repository.findByUsername(username);
    }

}
