package com.ex.yelpBackend.service;

import com.ex.yelpBackend.model.Bookmark;

import java.util.List;
import java.util.Optional;

public interface IBookmarkService {
    List<Bookmark> findAll();
    List<Bookmark> findAllByUsername(String username);
    void insert(Bookmark bookmark);
    void deleteBookmark(String id);
}
