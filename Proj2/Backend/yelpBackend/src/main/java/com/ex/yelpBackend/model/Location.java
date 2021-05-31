package com.ex.yelpBackend.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("location")
@AllArgsConstructor
@NoArgsConstructor
public class Location {

    private String address;
    private String zipcode;
}
