package com.ex.yelpBackend.controller;

import com.ex.yelpBackend.model.Bookmark;
import com.ex.yelpBackend.service.IBookmarkService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8082")
@RestController
@NoArgsConstructor
@RequestMapping("yelp")
public class BookmarkController {

    Logger log = LoggerFactory.getLogger(BookmarkController.class);

    @Autowired
    private IBookmarkService service;

    /**
     * @return returns response entity that contains all bookmarks.
     */
    @GetMapping("/bookmark/all")
    public ResponseEntity<List<Bookmark>> getAllBookmarks() {
        log.info("returning all bookmakrs");
        return ResponseEntity.ok(service.findAll());
    }

    /**
     * @param username username;
     * @return returns response entity that contains all bookmakrs under username.
     */
    @GetMapping("/bookmark/{username}")
    public ResponseEntity <List<Bookmark>> findAllByUsername(@PathVariable String username) {
        log.info("returning bookmakr under username: " + username);
        return ResponseEntity.ok(service.findAllByUsername("^" + username));
    }

    /**
     * @param id id;
     * @return returns response entity.
     */
    @DeleteMapping("/bookmark/delete/{id}")
    public ResponseEntity<Bookmark> deleteBookmark(@PathVariable String id){
        try {
            service.deleteBookmark(id);
            log.info("bookmark: " + id + " is deleted");
            return new ResponseEntity<> (null, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<> (null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param bookmark bookmark object that is being inserted;
     * @return returns response entity that contains new bookmark.
     */
    @PostMapping("/bookmark/insert")
    public ResponseEntity<Bookmark> insertB(@RequestBody Bookmark bookmark) {
        try {
            service.insert(bookmark);
            log.info(bookmark + " inserted");
            return new ResponseEntity<> (bookmark, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<> (null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
