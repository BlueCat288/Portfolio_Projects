package com.revature.servlets;
import java.io.PrintWriter;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import com.revature.pojos.*;
import com.revature.services.*;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    static UserService uService = new UserService();
    private static Logger log = Logger.getLogger(LoginServlet.class);


    /**
     * @param request req
     * @param response res
     * @throws ServletException ex
     * @throws IOException ex
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ObjectMapper usrmap = new ObjectMapper();
        User usr = usrmap.readValue(request.getInputStream(), User.class);

        User u = uService.validateUser(usr.getUserName(),usr.getPassWord());

        ObjectMapper mapper = new ObjectMapper();
        //need to find better way
        if (u == null) {
            String json = mapper.writeValueAsString(usr);
            log.trace("user: " + json);

            PrintWriter writer = response.getWriter();
            response.setContentType("/application/json");
            writer.write(json);
        } else {
            //login successfully
            String json = mapper.writeValueAsString(u);
            log.trace("user: " + json);

            PrintWriter writer = response.getWriter();
            response.setContentType("/application/json");
            writer.write(json);

            //get session
            HttpSession session = request.getSession();

            session.setAttribute("user", u);

        }

    }
}
