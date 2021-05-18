package com.revature.servlets;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import com.revature.pojos.*;
import com.revature.services.ReimburseService;
@WebServlet("/remb")
public class RembServlet extends HttpServlet {

    static ReimburseService rService = new ReimburseService();
    private static Logger log = Logger.getLogger(RembServlet.class);

    /**
     * @param request req
     * @param response res
     * @throws ServletException ex
     * @throws IOException ex
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session=request.getSession(false);
        System.out.println(session.getAttribute("user"));
        User u = (User) session.getAttribute("user");

        ObjectMapper mapper = new ObjectMapper();
        Reimbursement r = mapper.readValue(request.getInputStream(), Reimbursement.class);
        rService.addRembursement(r.getAmount(),r.getType(),r.getDescription(),u.getUserName());
        log.trace("new remb: "+r);

    }
}
