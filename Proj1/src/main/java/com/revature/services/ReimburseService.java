package com.revature.services;

import com.revature.dao.ReimbursementDao;
import com.revature.dao.UserDao;
import com.revature.pojos.Reimbursement;
import com.revature.pojos.User;
import org.bson.types.BSONTimestamp;
import java.util.List;
import org.apache.log4j.Logger;

public class ReimburseService {
    static Logger log = Logger.getLogger(ReimburseService.class);
    static ReimbursementDao rDao = new ReimbursementDao();
    static UserDao uDao = new UserDao();


    /**
     * @param u user object
     * @return rembs for same user
     */
    public List<Reimbursement> getUserRembs(User u) {
        List<Reimbursement> rembs = rDao.findAllByName(u.getUserName());
        return rembs;
    }

    /**
     * @param Amount remb amount
     * @param type type 1 = lodging, 2 = travel, 3 = food
     * @param description des
     * @param Author employee username
     */
    public void addRembursement(double Amount, int type, String description, String Author) {
        log.trace(Amount + " " + type + " " + description);
        Reimbursement r = new Reimbursement();
        BSONTimestamp ts = new BSONTimestamp((int)(System.currentTimeMillis() / 1000),1);
        r.setSubmitted(ts);
        r.setAmount(Amount);
        r.setType(type);
        r.setDescription(description);
        //set
        r.setAuthor(Author);
        r.setStatus(1);
        System.out.println(r);
        rDao.insert(r);
        log.trace("Added Reimbursement");
    }


    /**
     * @return solved rembs for all users
     */
    public List<Reimbursement> getOldRembs() {
        List<Reimbursement> rembs = rDao.findPast();
        for (Reimbursement r : rembs) {
            User u = uDao.findByName(r.getAuthor());
            r.setAuthorln(u.getLastName());
        }
        log.trace("old db");
        return rembs;
    }

    /**
     * @return pending rembs for all users
     */
    public List<Reimbursement> getPendingRembs() {
        log.trace("line 50 get g");
        List<Reimbursement> rembss = rDao.findPending();
        log.trace(rembss);
        for (Reimbursement r : rembss) {
            User u = uDao.findByName(r.getAuthor());
            r.setAuthorln(u.getLastName());
            /*log.trace(u);
            log.trace(r);*/
        }
        log.trace("pending db");

        return rembss;
    }

    /**
     * @param am amount
     * @return rem by amount
     */
    public Reimbursement findByAm(double am) {
        Reimbursement r = rDao.findByAm(am);
        log.trace(am);
        return r;
    }

    /**
     * @param r reimbursement new
     */
    public void updateRemb(Reimbursement r) {
        rDao.updateRemb(r);
    }
}
