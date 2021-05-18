package com.revature.servlets;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

import org.apache.log4j.Logger;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

public class ViewsServlet extends HttpServlet {
    private static Logger log = Logger.getLogger(ViewsServlet.class);

    /**
     * @param request req
     * @param response res
     * @throws ServletException ex
     * @throws IOException ex
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String path = "WebPartials/" + process(request,response) + ".html";
        log.debug(path);
        request.getRequestDispatcher(path).forward(request, response);

    }

    /**
     * @param req req
     * @param resp ress
     * @return return html name
     * @throws JsonParseException ex
     * @throws JsonMappingException ex
     * @throws IOException ex
     */
    static String process(HttpServletRequest req, HttpServletResponse resp) throws JsonParseException, JsonMappingException, IOException {
        log.info("request sent: " + req.getRequestURI());

        switch(req.getRequestURI()) {
            case "/Gradle___com_revature___Proj1_1_0_SNAPSHOT_war/login.serv" :
                return "login";
            case "/Gradle___com_revature___Proj1_1_0_SNAPSHOT_war/error-login.serv" :
                return "loginError";

            case "/Gradle___com_revature___Proj1_1_0_SNAPSHOT_war/employee.serv" :
                return "employee";
            case "/Gradle___com_revature___Proj1_1_0_SNAPSHOT_war/manager.serv" :
                return "manager";
            case "/Gradle___com_revature___Proj1_1_0_SNAPSHOT_war/remb.serv" :
                return "remb";
            case "/Gradle___com_revature___Proj1_1_0_SNAPSHOT_war/pass.serv" :
                return "pass";
            case "/Gradle___com_revature___Proj1_1_0_SNAPSHOT_war/pending.serv" :
                return "pending";
            case "/Gradle___com_revature___Proj1_1_0_SNAPSHOT_war/old.serv" :
                return "old";
            case "/Gradle___com_revature___Proj1_1_0_SNAPSHOT_war/register.serv" :
                return "register";
            case "/Gradle___com_revature___Proj1_1_0_SNAPSHOT_war/employeeNav.serv" :
                return "employeeNav";
            case "/Gradle___com_revature___Proj1_1_0_SNAPSHOT_war/managerNav.serv" :
                return "managerNav";
            case "/Gradle___com_revature___Proj1_1_0_SNAPSHOT_war/removeAll.serv" :
                return "removeAll";
        }
        return null;
    }

}
