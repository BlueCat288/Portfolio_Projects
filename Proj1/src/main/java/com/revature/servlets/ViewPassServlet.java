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

@WebServlet("/pass")
public class ViewPassServlet extends HttpServlet {

    static ReimburseService rService = new ReimburseService();
    private static Logger log = Logger.getLogger(ViewPassServlet.class);

    /**
     * @param request req
     * @param response res
     * @throws ServletException ex
     * @throws IOException ex
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session=request.getSession(false);
        System.out.println(session.getAttribute("user"));
        User u = (User) session.getAttribute("user");

        List<Reimbursement> rembs = rService.getUserRembs(u);

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(rembs);
        log.trace("find all passed: " + json);

        PrintWriter writer = response.getWriter();
        response.setContentType("/application/json");
        writer.write(json);

    }


}
