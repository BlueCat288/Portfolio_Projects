import {useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import useReactRouter from 'use-react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from "@fortawesome/free-solid-svg-icons";

import '../../css/search-bar.css';

export default function SearchBar(props) {
    const [searchText, setSearchText] = useState("");
    const [locationText, setLocationText] = useState("");
    const {history} = useReactRouter();

    const onSubmit = () => {
        history.push(`/search?location=${locationText}&term=${searchText}`);
    }
  return (
    <>
        <div>   
            <form className="search-bar-wrapper">
                <div style={{paddingLeft: '.10em'}}>
                    <button type="submit" onClick={onSubmit} className="button-search" style={{float: "right"}}><FontAwesomeIcon className="fa-icon-search" icon={faSearch} /></button>
                </div>
               
                <div style={{overflow: 'hidden', paddingRight: '.10em'}}>
                    
                    <Row>
                        <Col>
                            <input
                                required
                                value = {searchText}
                                type = "text"
                                placeholder = "Find"
                                className="search-input left-search"
                                name="term"
                                id="search"
                                onChange = {e => setSearchText(e.target.value)}
                            />
                        </Col>
                        
                        <Col>
                            <input
                                required
                                value = {locationText}
                                type = "text"
                                name="location"
                                placeholder = "Near"
                                className="search-input right-search"
                                id="search"
                                onChange = {e => setLocationText(e.target.value)}
                            />
                        </Col>
                    </Row>
                </div>
            </form>
        </div>
    </>
  );
}


