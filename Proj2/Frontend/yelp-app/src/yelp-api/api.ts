import {BASE_URL, BEARER_TOKEN} from './config'; 
import queryString from 'query-string';
// import axios from 'axios';

export function get(path, queryParam) {
    const query = queryString.stringify(queryParam);
    const newLimit: number = 50;
    return fetch(`${BASE_URL}${path}?${query}&limit=${newLimit}`, {
        mode: 'cors',
        headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
            Origin: 'localhost',
            withCredentials: 'true',
        },
    });
}