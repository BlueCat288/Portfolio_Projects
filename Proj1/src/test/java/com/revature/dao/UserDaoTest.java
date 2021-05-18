package com.revature.dao;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserDaoTest {
    public static UserDao uDao = new UserDao();

    @Test
    void getAll() {
        assertNotNull(uDao.getAll());

    }

    @Test
    void findByName() {
        assertNotNull(uDao.findByName("xinyaozhu"));
    }
}