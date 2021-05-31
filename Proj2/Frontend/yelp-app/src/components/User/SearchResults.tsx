import {useState} from 'react';
import '../../css/search-results.css';
import {Row, Col, Button, Modal} from 'react-bootstrap';
import Bookmark from '../../entity/Bookmark.entity';
import Location from '../../entity/Location.entity';

import BookmarkController from '../../controller/Bookmark.controller';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBookmark, faStar} from "@fortawesome/free-solid-svg-icons";


export default function SearchResults(props) {
    const bookmarkController: BookmarkController = new BookmarkController();
    const [name, setName] = useState("");

    const [showConfirm, setShowConfirm] = useState(false);
    const handleCloseConfirm = () => setShowConfirm(false);
    const handleShowConfirm = () => setShowConfirm(true);
    
    const [showExist, setShowExist] = useState(false);
    const handleCloseExist = () => setShowExist(false);
    const handleShowExist  = () => setShowExist(true);

    if(!props.businesses || !props.businesses.length) {
        return (<div></div>);
    }

    const addBookmark = async (bookmark: Bookmark) => {
        const newBookmarkList = new Bookmark(
            bookmark.getBookmarkId(),
            bookmark.getUsername(),
            bookmark.getName(),
            bookmark.getRating(),
            bookmark.getUrl(),
            bookmark.getPhonenumber(),
            bookmark.getLocation()
        );
        setName(newBookmarkList.getName());
        
        await bookmarkController.insertBookmark(newBookmarkList)
        .then(response => {
            if(response.status === 201) {
                handleShowConfirm();
            } 
        }).catch (err => {
            console.log(err);
            handleShowExist();
        })
        
    }

    const renderBookmarkButton = (bookmark: Bookmark) => {
        return <FontAwesomeIcon className="fa-icon-bookmark" icon={faBookmark} onClick={() => addBookmark(bookmark)}/>
    }

    const confirmModal = () => {
        return (
            <Modal show={showConfirm} onHide={handleCloseConfirm}  
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>{name}</h6>
                    <h6>Has been added to your bookmark!</h6>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirm}>
                    Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const alreadyExistModal = () => {
        return (
            <Modal show={showExist} onHide={handleCloseExist}  
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>{name}</h6>
                    <h6>Already in your bookmark!</h6>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseExist}>
                    Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    
    return (
        <div>
            {confirmModal()}
            {alreadyExistModal()}
            {
            props.businesses.map((b: any, index: number) => (
                <div key={b.id} className="card-wrapper">
                    <Row>
                        <Col>
                            <div className="img-wrapper">
                                <a href={b.url}>
                                    <img src={b.image_url} alt={b.name}/> 
                                    {/* style={{height: "28vh", width: "40vh"}} */}
                                </a>
                            </div>
                           
                        </Col>

                        <Col md={5}>
                            <h3>{(index + 1) + ") "}{b.name}</h3>
                            <span style={{display: 'inline', paddingRight: '5px'}}>
                                {[...Array(Math.round(b.rating))].map((e, i) => 
                                    <FontAwesomeIcon key={i} style={{color: 'crimson'}} className="" icon={faStar} />
                                )} 
                            </span>
                            <span style={{fontSize: '15px'}}>{b.review_count}</span>
                            
                            <br/>
                            <span style={{paddingRight: '5px', color: 'gray'}}>{b.price === undefined ? "": b.price + " • "}</span>
                            {b.categories.map((c: any, index: number) => (
                                <span className="tag-wrapper" key={index}>
                                    <span style={{fontSize: '10px'}} className="tag" >{c.title}</span>
                                </span>
                            ))}

                            <div>
                               
                            </div>
                        </Col>
                             
                        <Col>
                            <span className="contact-wrapper" style={{fontSize: '15px', float: 'right', color: 'gray'}}>
                                <Row>
                                    {b.phone[2] === undefined ? "" : <p>{"(" + b.phone[2] + b.phone[3] + b.phone[4] + ") " + b.phone[5] + b.phone[6]+ b.phone[7] + "-" + b.phone[8] + b.phone[9]+ b.phone[10] + b.phone[11]}</p>}
                                </Row>

                                <Row>
                                    {b.location.address1}
                                </Row>
                                
                                <Row>
                                    {b.location.city}
                                </Row>

                                <Row>
                                    <div>
                                    <div className="bookmark-wrapper" style={{bottom: 0, position: "absolute", float: "right"}}>
                                        {renderBookmarkButton(new Bookmark(b.id, props.username, b.name, b.rating, b.url, b.phone, new Location(b.location.address1, b.location.zip_code)))}
                                    </div>
                                    </div>
                                    
                                </Row>
                            </span>
                        </Col>
                    </Row>
                </div>
            ))
            }
        </div>
    );
}
