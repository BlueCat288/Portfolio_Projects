package com.revature.pojos;

import org.bson.types.BSONTimestamp;
import org.bson.types.ObjectId;

public class Reimbursement {
    private double amount;
    private BSONTimestamp submitted;
    private BSONTimestamp resolved;
    private String description;
    private String Author;
    private String resolver;
    private int status;
    private int type;
    private String authorln;

    private ObjectId id;

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public BSONTimestamp getSubmitted() {
        return submitted;
    }

    public void setSubmitted(BSONTimestamp submitted) {
        this.submitted = submitted;
    }

    public BSONTimestamp getResolved() {
        return resolved;
    }

    public void setResolved(BSONTimestamp resolved) {
        this.resolved = resolved;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAuthor() {
        return Author;
    }

    public void setAuthor(String author) {
        Author = author;
    }

    public String getResolver() {
        return resolver;
    }

    public void setResolver(String resolver) {
        this.resolver = resolver;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getAuthorln() {
        return authorln;
    }

    public void setAuthorln(String authorln) {
        this.authorln = authorln;
    }

    @Override
    public String toString() {
        return "Reimbursement{" +
                "amount=" + amount +
                ", submitted=" + submitted +
                ", resolved=" + resolved +
                ", description='" + description + '\'' +
                ", Author='" + Author + '\'' +
                ", resolver=" + resolver +
                ", status=" + status +
                ", type=" + type +
                ", authorln='" + authorln + '\'' +
                ", id=" + id +
                '}';
    }
}
