package com.revature.servlets;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import com.revature.pojos.*;
import com.revature.services.*;


@WebServlet("/old")
public class ViewOldServlet extends HttpServlet {
    static ReimburseService rService = new ReimburseService();
    static UserService uService = new UserService();
    private static Logger log = Logger.getLogger(ViewOldServlet.class);

    /**
     * @param request http request
     * @param response thhp response
     * @throws ServletException ex
     * @throws IOException ex
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        List<Reimbursement> rembs = rService.getOldRembs();
        log.trace("old got db");
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(rembs);
        log.trace("find all old rembs: " + json);

        PrintWriter writer = response.getWriter();
        response.setContentType("/application/json");
        writer.write(json);

    }

}
