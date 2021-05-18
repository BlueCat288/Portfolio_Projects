package com.revature.dao;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ReimbursementDaoTest {

    public static ReimbursementDao rDao = new ReimbursementDao();

    @Test
    void getAll() {
        assertNotNull(rDao.getAll());
    }

    @Test
    void insert() {
    }

    @Test
    void findAllByName() {
        assertNotNull(rDao.findAllByName("xinyaozhu"));
    }

    @Test
    void findPending() {
        assertNotNull(rDao.findPending());
    }

    @Test
    void findPast() {
        assertNotNull(rDao.findPast());
    }

    @Test
    void findByAm() {
        assertNotNull(rDao.findByAm(111));
    }
}