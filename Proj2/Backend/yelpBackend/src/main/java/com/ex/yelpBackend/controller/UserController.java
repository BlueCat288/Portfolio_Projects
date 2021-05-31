package com.ex.yelpBackend.controller;

import com.ex.yelpBackend.model.User;
import com.ex.yelpBackend.service.IUserService;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin(origins = "http://localhost:8082")
@RestController
@NoArgsConstructor
@RequestMapping("yelp")
public class UserController {

    Logger log = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private IUserService service;

    /**
     * @return returns response entity that contains all users.
     */
    @GetMapping("/user/all")
    public ResponseEntity <List<User>> getAllUsers() {
        log.info("finding all users");
        return ResponseEntity.ok(service.findAll());
    }

    /**
     * @param username username;
     * @return returns response entity that contains user under username
     */
    @GetMapping("/user/{username}")
    public ResponseEntity <User> findByUsername(@PathVariable String username) {
        log.info("find user by username: " + username);
        return ResponseEntity.ok(service.findOneByUsername(username));
    }

    /**
     * @param user user object is being inserted;
     * @return returns response entity that contains new user.
     */
    @PostMapping("/user/insert")
    public ResponseEntity<User> insertU(@RequestBody User user) {
        try {
            service.insert(user);
            log.info(user + " created");
            return new ResponseEntity<> (user, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<> (null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
