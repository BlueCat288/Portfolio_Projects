package com.revature.services;

import com.revature.pojos.User;
import com.revature.dao.UserDao;
import org.apache.log4j.Logger;

import java.util.List;

public class UserService {

    static Logger log = Logger.getLogger(UserService.class);
    static UserDao uDao = new UserDao();

    /**
     * @param userName username
     * @param passWord password
     * @return if valid user, return user
     */
    public User validateUser(String userName, String passWord) {
        User u = uDao.findByName(userName);

        log.debug(u);
        if(u.getPassWord().equals(passWord)) {
            return u;
        }
        else {
            return new User();
        }
    }

    /**
     * @param u new user object
     */
    public void insertUser(User u) {
        uDao.insert(u);
    }

    /**
     * @param userName username
     * @return true if user exists
     */
    public boolean checkExist(String userName) {
        UserDao udao = new UserDao();
        List<User> users = udao.getAll();
        for (User u : users) {
            if(u.getUserName().equals(userName)) {
                return true;
            }
        }

        return false;

    }

}
