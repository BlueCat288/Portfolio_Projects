import Bookmark from "../../entity/Bookmark.entity";
import {Button, Col, Row} from 'react-bootstrap';
import { useEffect, useState } from "react";
import BookmarkController from "../../controller/Bookmark.controller";

export default function RandomModal() {
    const userJSON = localStorage.getItem("user");

    const [bookmarkList, setBookmarkList] = useState([]);
    const parsedUser = JSON.parse(userJSON);
    const [nameM, setnameM] = useState("");

    useEffect(() => {
        const bookmarkController: BookmarkController = new BookmarkController();
        const uName = parsedUser.username;
        bookmarkController.getAllBookmarkByUsername(uName).then((b: Bookmark[]) => {
                b.map(n => bookmarkList.push(n.getName()));
                setnameM(bookmarkList[Math.floor(Math.random() * (bookmarkList.length))]);
            console.log(bookmarkList[Math.floor(Math.random() * (bookmarkList.length))])
        })

    }, [])




    return (
        <div>
            Looks like a good day to eat at...{nameM}!
        </div>
    )

}
