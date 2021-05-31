package com.ex.yelpBackend.controller;

import com.ex.yelpBackend.model.Bookmark;
import com.ex.yelpBackend.model.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.junit.Before;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.Assert.*;

public class BookmarkControllerTest extends AbstractTest{

    @Override
    @Before
    public void setUp() {
        super.setUp();
    }

    @Test
    public void getAllBookmarks() throws Exception {
        String uri = "/yelp/bookmark/all";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        String content = mvcResult.getResponse().getContentAsString();
        Bookmark[] bookmarkList = super.mapFromJson(content, Bookmark[].class);
        assertTrue(bookmarkList.length > 0);
    }

    @Test
    public void findAllByUsername() throws Exception {
        String uri = "/yelp/bookmark/xinyaozhu";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        String content = mvcResult.getResponse().getContentAsString();
        Bookmark[] bookmarkList = super.mapFromJson(content, Bookmark[].class);
        assertTrue(bookmarkList.length > 0);
    }


    @Test
    public void insertB() throws Exception {
        String uri = "/yelp/bookmark/insert";
        Bookmark bm = new Bookmark();
        bm.setName("testtest");
        bm.setUsername("testU");
        bm.setBookmarkId("1");
        String inputJson = super.mapToJson(bm);
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(uri)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(inputJson)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(201, status);
        String content = mvcResult.getResponse().getContentAsString();
        assertNotNull(content);
    }

    @Test
    public void deleteBookmark() throws Exception {
        String uri = "/yelp/bookmark/delete/1";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.delete(uri)).andReturn();
        int status = mvcResult.getResponse().getStatus();
        assertEquals(202, status);
    }

    @Test
    public void throwsExceptionOnNull() {
        BookmarkController bc = new BookmarkController();
        bc.insertB(null);
        bc.deleteBookmark(null);
    }
}