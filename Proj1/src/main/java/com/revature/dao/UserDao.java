package com.revature.dao;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.MongoException;
import com.mongodb.client.*;
import com.revature.pojos.User;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.eq;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;


public class UserDao implements Dao{
    MongoCollection<User> user;
    public UserDao() {
        ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017/rbsystem");
        CodecRegistry pojoCodecRegistry = fromProviders(PojoCodecProvider.builder().automatic(true).build());
        CodecRegistry codecRegistry = fromRegistries(MongoClientSettings.getDefaultCodecRegistry(), pojoCodecRegistry);
        MongoClientSettings clientSettings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .codecRegistry(codecRegistry)
                .build();
        MongoClient client = MongoClients.create(clientSettings);
        MongoDatabase db = client.getDatabase("rbsystem");
        this.user = db.getCollection("user", User.class);


    }


    /**
     * @return all users
     */
    @Override
    public List getAll() {
        List<User> users = new ArrayList<User>();
        try {
            MongoCursor<User> cur = user.find().iterator();
            while (cur.hasNext()) {
                users.add(cur.next());

            }
        }catch (MongoException e) {
            e.printStackTrace();
        }
        return users;
    }

    /**
     * @param userName username
     * @return find user by username
     */
    public User findByName(String userName) {

        return user.find(eq("userName", userName)).first();
    }


    /**
     * @param u user new
     */
    public void insert(User u){
        user.insertOne(u);
    }

}
