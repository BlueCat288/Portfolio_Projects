package com.revature.servlets;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import com.revature.dao.ReimbursementDao;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import com.revature.pojos.*;
import com.revature.services.*;
import org.bson.types.BSONTimestamp;

@WebServlet({"/pending","/approveRemb","/denyRemb"})
public class ViewPendingServlet extends HttpServlet {

    static ReimburseService rService = new ReimburseService();
    private static Logger log = Logger.getLogger(ViewPendingServlet.class);
    static ReimbursementDao rdao = new ReimbursementDao();

    /**
     * @param request req
     * @param response res
     * @throws ServletException ex
     * @throws IOException ex
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        log.trace("here");
        //List<Reimbursement> rembs = rdao.findPending();
        List<Reimbursement> rembs = rService.getPendingRembs();
        log.trace("got database " + rembs);
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(rembs);
        log.trace("got all pending: " + json);

        //send response
        PrintWriter writer = response.getWriter();
        response.setContentType("/application/json");
        writer.write(json);

    }

    /**
     * @param request req
     * @param response res
     * @throws ServletException ex
     * @throws IOException ex
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        Reimbursement r = mapper.readValue(request.getInputStream(), Reimbursement.class);
        Reimbursement rembs = rService.findByAm(r.getAmount());
        if (r.getStatus()==2) {
            rembs.setStatus(2);
        }
        else {
            rembs.setStatus(3);
        }
        HttpSession session = request.getSession(false);
        User u = (User) session.getAttribute("user");
        log.trace(u);
        log.trace(u.getLastName());
        rembs.setResolver(u.getLastName());
        BSONTimestamp ts = new BSONTimestamp((int)(System.currentTimeMillis() / 1000),1);
        rembs.setResolved(ts);
        rService.updateRemb(rembs);
        log.trace("did update");

    }
}
