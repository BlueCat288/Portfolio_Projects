import Bookmark from "../entity/Bookmark.entity";
import Location from "../entity/Location.entity";

import axios from "axios";

// "bookmarkId": "60a818bf2c2b23325da55361",
// "username": "sam",
// "name": "Burger Shop",
// "rating": "4.5",
// "url": "google.com",
// "phonenumber": "831231234",
// "location": {
// "address": "5232 coe asdja st",
// "zipcode": "782131"
// }

export default class BookmarkController {
    private url: string = "http://localhost:8082/yelp";

   private jsonToEntity = (bookmark: any) => {
       const location = new Location(bookmark.location.address, bookmark.location.zipcode);
       return new Bookmark(
            bookmark.bookmarkId,
            bookmark.username,
            bookmark.name,
            bookmark.rating,
            bookmark.url,
            bookmark.phonenumber,
            location
            );
   }

   private getAllBookmarkByUsernameHelper = (username: string): Promise<any> => {
       return axios.get(`${this.url}/bookmark/${username}`).then((response) => response.data);
   }

   getAllBookmarkByUsername = async (username: string) => {
       const getBookmark = [await this.getAllBookmarkByUsernameHelper(username)];
       const bookmarks = getBookmark[0];
       console.log(username + "++++++++" + getBookmark[0]);
       console.log(bookmarks + "123");
       return bookmarks.map((bookmark: any) =>
            this.jsonToEntity(bookmark)
       );
   }

   insertBookmark = async (bookmark: Bookmark) => {
        return await axios.post(`${this.url}/bookmark/insert`, bookmark);
   }

   deleteBookmark = async (bookmarkId: string) => {
        await axios.delete(`${this.url}/bookmark/delete/${bookmarkId}`)
   }
}