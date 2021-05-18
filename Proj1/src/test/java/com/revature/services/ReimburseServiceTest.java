package com.revature.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import com.revature.pojos.User;
import com.revature.pojos.Reimbursement;
import static org.junit.jupiter.api.Assertions.*;

class ReimburseServiceTest {

    public static ReimburseService rService = new ReimburseService();
    public static User u = new User();
    public static Reimbursement r = new Reimbursement();

    @BeforeEach
    public void beforeEachTest(){
        u.setUserName("xinyaozhu");
    }



    @Test
    void getUserReimbs() {
        assertNotNull(rService.getUserRembs(u));
    }

    @Test
    void addReimbursement() {
        r.setAmount(1000);
        r.setAuthor("testR");
        r.setDescription("testR");
        r.setType(1);
        rService.addRembursement(r.getAmount(), r.getType(),
           r.getDescription(),r.getAuthor());
    }

    @Test
    void getOldReimbs() {
        assertNotNull(rService.getOldRembs());
    }

    @Test
    void getPendingReimbs() {
        assertNotNull(rService.getPendingRembs());
    }

    @Test
    void findByAm() {
        assertNotNull(rService.findByAm(111));
    }
}