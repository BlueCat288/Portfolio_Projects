package com.ex.yelpBackend.service;

import com.ex.yelpBackend.model.Bookmark;
import com.ex.yelpBackend.repository.BookmarkRepository;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@NoArgsConstructor
public class BookmarkService implements IBookmarkService{

    Logger log = LoggerFactory.getLogger(BookmarkService.class);

    @Autowired
    private BookmarkRepository repository;

    /**
     * @param bookmark bookmark object.
     */
    @Override
    public void insert(Bookmark bookmark) {
        log.info("b service 28");
        this.repository.insert(bookmark);
    }

    /**
     * @return all bookmarks.
     */
    @Override
    public List<Bookmark> findAll() {
        log.info("b service 34");
        return this.repository.findAll();
    }

    /**
     * @param username username;
     * @return all bookmarks under username.
     */
    @Override
    public List<Bookmark> findAllByUsername(String username) {
        log.info("b service 40");
        return this.repository.findAllByUsername(username);
    }

    /**
     * @param id id.
     */
    @Override
    public void deleteBookmark(String id) {
        log.info("b service 46");
        this.repository.deleteById(id);
    }

}
