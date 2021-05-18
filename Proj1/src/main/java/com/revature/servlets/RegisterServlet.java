package com.revature.servlets;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import com.revature.pojos.*;
import com.revature.services.*;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {

    static UserService uService = new UserService();
    private static Logger log = Logger.getLogger(RegisterServlet.class);


    /**
     * @param request req
     * @param response res
     * @throws ServletException ex
     * @throws IOException ex
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ObjectMapper usrmap = new ObjectMapper();
        User u = usrmap.readValue(request.getInputStream(), User.class);

        log.info("created user: " + u);

        if (!uService.checkExist(u.getUserName())) {
            u.setUserRole(1);
            uService.insertUser(u);
        }


    }
}
