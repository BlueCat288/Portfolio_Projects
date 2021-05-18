package com.revature.dao;

import com.mongodb.client.*;
import com.revature.pojos.Reimbursement;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.MongoException;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.model.Updates;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.bson.types.BSONTimestamp;
import org.bson.types.ObjectId;
import static com.mongodb.client.model.Filters.eq;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.not;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;


public class ReimbursementDao {
    MongoCollection<Reimbursement> remb;

    public ReimbursementDao() {
        ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017/rbsystem");
        CodecRegistry pojoCodecRegistry = fromProviders(PojoCodecProvider.builder().automatic(true).build());
        CodecRegistry codecRegistry = fromRegistries(MongoClientSettings.getDefaultCodecRegistry(), pojoCodecRegistry);
        MongoClientSettings clientSettings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .codecRegistry(codecRegistry)
                .build();
        MongoClient client = MongoClients.create(clientSettings);
        MongoDatabase db = client.getDatabase("rbsystem");
        this.remb = db.getCollection("remb", Reimbursement.class);
    }

    /**
     * @return all rembs
     */
    public List getAll() {
        List<Reimbursement> reimbursements = new ArrayList<Reimbursement>();
        try {
            MongoCursor<Reimbursement> cur = remb.find().iterator();
            while (cur.hasNext()) {
                reimbursements.add(cur.next());

            }
        }catch (MongoException e) {
            e.printStackTrace();
        }

        return reimbursements;
    }


    /**
     * @param rembs create new rembs
     */
    public void insert(Reimbursement rembs) {
        remb.insertOne(rembs);

    }


    /**
     * @param userNames username
     * @return find all rembs by username
     */
    public List<Reimbursement> findAllByName(String userNames){
        List<Reimbursement> rembs = new ArrayList<Reimbursement>();
        try {
            MongoCursor<Reimbursement> cur = remb.find(eq("author", userNames)).iterator();
            while (cur.hasNext()) {
                rembs.add(cur.next());

            }
        }catch (MongoException e) {
            e.printStackTrace();
        }
        return rembs;
    }

    /**
     * @return all pending rembs
     */
    public List<Reimbursement> findPending() {
        List<Reimbursement> pRembs = new ArrayList<Reimbursement>();
        try {
            MongoCursor<Reimbursement> cur = remb.find(eq("status", 1)).iterator();
            while (cur.hasNext()) {
                pRembs.add(cur.next());

            }
        }catch (MongoException e) {
            e.printStackTrace();
        }
        return pRembs;
    }

    /**
     * @return solved rembs
     */
    public List<Reimbursement> findPast() {
        List<Reimbursement> pasRembs = new ArrayList<Reimbursement>();
        try {
            MongoCursor<Reimbursement> cur = remb.find(not(eq("status", 1))).iterator();
            while (cur.hasNext()) {
                pasRembs.add(cur.next());

            }
        }catch (MongoException e) {
            e.printStackTrace();
        }
        return pasRembs;
    }

    /**
     * @param rembs updated rembs
     */
    public void updateRemb(Reimbursement rembs) {
        double am = rembs.getAmount();
        String solver = rembs.getResolver();
        int stat = rembs.getStatus();
        BSONTimestamp solv = rembs.getResolved();

        remb.updateOne(eq("amount",am),Updates.set("status", stat));
        remb.updateOne(eq("amount",am),Updates.set("resolver", solver));
        remb.updateOne(eq("amount",am),Updates.set("resolved", solv));
    }

    /**
     * @param am amount
     * @return find remb by amount
     */
    public Reimbursement findByAm(double am) {
        return remb.find(eq("amount", am)).first();
    }

}
