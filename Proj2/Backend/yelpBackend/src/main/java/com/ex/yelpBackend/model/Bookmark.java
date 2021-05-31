package com.ex.yelpBackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("bookmark")
@AllArgsConstructor
@NoArgsConstructor
public class Bookmark {
    @Id
    private String bookmarkId;
    private String username;
    private String name;
    private String rating;
    private String url;
    private String phonenumber;
    private Location location;
}
