import {useState, useEffect} from 'react';
import '../../css/home.css';
import Logo from '../../image/yelp.svg'
import SearchBar from '../User/SearchBar.component';

import {useBusSearch} from '../../yelp-api/useBusSearch';
import useReactRouter from 'use-react-router';
import SearchResults from './SearchResults';
import UserInfoModal from './UserInfoModal';
import BookmarkModal from "./BookmarkModal";
import RandomModal from "./RandomModal";

import User from "../../entity/User.entity";
import {useHistory} from 'react-router-dom';
import {Col, Row, Button, Modal} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBookmark, faBars, faHome, faPowerOff, faUserCircle} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
    // const history = useHistory();
    const {location} = useReactRouter();
    const params = new URLSearchParams(location.search);
    const term = params.get('term');
    const locationParam = params.get('location');
    const [businesses, amountResults, searchParams, setSearchParams] = useBusSearch(term, locationParam);

    const userJSON = localStorage.getItem("user");
    const [auth, setAuth] = useState(true);
    const history = useHistory();
    const [username, setUsername] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [showBookmark, setShowBookmark] = useState(false);
    const [showRandom, setRandom] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleBookmarkShow = () => setShowBookmark(true);
    const handleBookmarkClose = () => setShowBookmark(false);
    const handleRandomShow = () => setRandom(true);
    const handleRandomClose = () => setRandom(false);

    useEffect(() => {
        if(userJSON) {
            const parsedUser = JSON.parse(userJSON);
            let user:User = new User(parsedUser.id, parsedUser.username, parsedUser.password, parsedUser.name);
            if(user.getName() !== null) {
                setUsername(user.getUsername());
            }
        }
        if(auth === false) {
            history.replace('/');
        }
    },[auth])

    const onUserLogout = () => {
        localStorage.removeItem("user");
        setAuth(false);

    }

    const toggleSM = () => {
        if(document !== null) {
          const width = document.getElementById("sideMenu")!.style.width;
          const marginLeft = document.getElementById("pg-content")!.style.marginLeft;
    
          document.getElementById("sideMenu")!.style.width = (width === "150px" ? "55px" : "150px");
          document.getElementById("pg-content")!.style.marginLeft = (marginLeft === "0" ? "0" : "0");
        }
    }

    const accountModal = () => {
        return(
            <Modal show={showModal} onHide={handleClose}  
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <UserInfoModal/>
                </Modal.Body>

                <Modal.Footer>
                    <Button>
                        Hard to decide? Click ME!
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
    const bookmarkModal = () => {
        return(
            <Modal show={showBookmark} onHide={handleBookmarkClose}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Bookmarks</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <BookmarkModal/>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleRandomShow}>
                        Hard to decide? Click!
                    </Button>
                    <Button variant="secondary" onClick={handleBookmarkClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
    const randomModal = () => {
        return(
            <Modal show={showRandom} onHide={handleRandomClose}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">YEEEET</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <RandomModal/>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleRandomClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    
    
    return (
        <>
        <div id="sideMenu" className="sideMenu">
            <div className="sm-wrapper">
                <Row>
                    <Col>
                        <FontAwesomeIcon className="fa-icon menu-pointer" icon={faBars} onClick={toggleSM}/>
                    </Col>

                </Row>

                <Row>
                    <Col>
                        <FontAwesomeIcon className="fa-icon" icon={faHome} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                    <FontAwesomeIcon className="fa-icon" onClick={handleBookmarkShow} icon={faBookmark} />
                    </Col>

                </Row>

                <Row>
                    <Col>
                    <FontAwesomeIcon className="fa-icon" onClick={handleShow} icon={faUserCircle} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                    <FontAwesomeIcon className="fa-icon" onClick={() => onUserLogout()} icon={faPowerOff} />
                    </Col>
                </Row>
            </div>
        </div>
             
        <div id="pg-content">
            <div>
                <Row md={3}>
                    <Col>
                        {/* <h2 className="brand-name">Welp</h2> */}
                        {/* <div className="title-wrapper"> */}
                        <span className="brand-name">Welp <img alt="" className="img-logo" src={Logo} style={{ width: '5%', margin: '0 0 0 0'}}/></span> 
                        {/* </div> */}
                    </Col>

                    <Col>
                        <SearchBar term={term} locationParam={locationParam}/>
                    </Col>
                    <Col></Col>

                </Row>
                <hr/>

                <Row md ={1.8}>
                    <div className="content-wrapper">
                        <div className="main-contents">
                            <Row md={4}>
                                <Col style={{display: 'inline'}}>
                                    <h5>Search Results: </h5>
                                    {Object.values(searchParams).map((k) => 
                                        <span>{k.toUpperCase() + " "} </span>
                                    )} 
                                </Col>

                                

                                <Col>
                                    <h5>50/{amountResults} results found.</h5>
                                </Col>
                            </Row>
                            <hr></hr>
                            <SearchResults businesses={businesses} username={username}/>
                            {accountModal()}
                            {bookmarkModal()}
                            {randomModal()}

                        </div>
                    </div>
                </Row>      
            </div>
        </div>

        </>
    );
}


