import Location from './Location.entity';

export default class Bookmark {
    private bookmarkId: string = "";
    private username: string = "";
    private name: string = "";
    private rating: string = "";
    private url: string = "";
    private phonenumber: string = "";
    private location: Location = null;

    constructor(bookmarkId: string, username: string, name: string, rating: string, url: string, phonenumber: string, location: Location) {
        this.setBookmarkId(bookmarkId);
        this.setUsername(username);
        this.setName(name);
        this.setRating(rating);
        this.setUrl(url);
        this.setPhonenumber(phonenumber);
        this.setLocation(location);
    }

    getBookmarkId = () => this.bookmarkId;
    setBookmarkId = (bookmarkId: string) => this.bookmarkId = bookmarkId;

    getUsername = () => this.username;
    setUsername = (username: string) => this.username = username;

    getName = () => this.name;
    setName = (name: string) => this.name = name;

    getRating = () => this.rating;
    setRating = (rating: string) => this.rating = rating;

    getUrl = () => this.url;
    setUrl = (url: string) => this.url = url;

    getPhonenumber = () => this.phonenumber;
    setPhonenumber = (phonenumber: string) => this.phonenumber = phonenumber;

    getLocation = () => this.location;
    setLocation = (location: Location) => this.location = location;

}