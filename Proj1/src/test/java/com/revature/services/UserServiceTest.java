package com.revature.services;

import org.junit.jupiter.api.Test;
import com.revature.pojos.User;

import static org.junit.jupiter.api.Assertions.*;

class UserServiceTest {
    public static UserService uService = new UserService();
    public static User u = new User();

    @Test
    void validateUser() {
        assertNotNull(uService.validateUser("xinyaozhu", "111111"));

    }

    @Test
    void insertUser() {
        u.setUserName("test1");
        u.setPassWord("test1");
        u.setFirstName("test1");
        u.setLastName("test1");
        u.setUserRole(1);
        uService.insertUser(u);
        assertTrue(uService.checkExist("test1"));

        
    }

    @Test
    void checkExist() {
        assertTrue(uService.checkExist("xinyaozhu"));
    }
}