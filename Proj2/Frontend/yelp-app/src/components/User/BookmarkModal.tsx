import Bookmark from "../../entity/Bookmark.entity";
import {Button, Col, Row} from 'react-bootstrap';
import { useEffect, useState } from "react";
import BookmarkController from "../../controller/Bookmark.controller";

export default function BookmarkModal() {

    const userJSON = localStorage.getItem("user");
    
    const [bookmarkList, setBookmarkList] = useState([]);
    const parsedUser = JSON.parse(userJSON);

    useEffect(() => {
        const bookmarkController: BookmarkController = new BookmarkController();
        const uName = parsedUser.username;
        bookmarkController.getAllBookmarkByUsername(uName)
        .then((b: Bookmark[]) => {
            setBookmarkList(b);
        })
    }, [])

    return (
        <div>
            {
                bookmarkList.map((b: any,index:number)=> (
                    <div>
                    <Row>
                        <Col>
                            <a href={b.url} style={{color: 'black'}}>{b.name}</a>
                        </Col>

                        <Col>
                            {b.phonenumber[2] === undefined ? "" : "(" + b.phonenumber[2] + b.phonenumber[3] + b.phonenumber[4] + ") " + b.phonenumber[5] + b.phonenumber[6]+ b.phonenumber[7] + "-" + b.phonenumber[8] + b.phonenumber[9]+ b.phonenumber[10] + b.phonenumber[11]}
                        </Col>
            
                        <Col>
                            <Button variant="outline-dark" className="remove-btn" value={b.bookmarkId} onClick={e =>removeBookmark((e.target as HTMLButtonElement).value)}>Remove</Button>
                            <Button style={{marginLeft: '5px'}} variant="outline-warning" className="detail-btn"><a style={{color: 'black'}} href={b.url}>Details</a></Button>
                        </Col>
                    </Row>
                    <br></br>
                    </div>
                    

                ))
            }
        </div>
        );

        function removeBookmark (id:string) {
            const bookmarkController = new BookmarkController();
            bookmarkController.deleteBookmark(id);
            // console.log("deleted: " + id);

            setBookmarkList(bookmarkList.filter(b => b.getBookmarkId() !== id));
            // console.log(bookmarkList);
        }
}



