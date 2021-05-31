import User from "../../entity/User.entity";
import {Form, Col, Row} from 'react-bootstrap';
import { useEffect, useState } from "react";

export default function UserInfoModal() {

    const userJSON = localStorage.getItem("user");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if(userJSON) {
            const parsedUser = JSON.parse(userJSON);
            let user:User = new User(parsedUser.id, parsedUser.username, parsedUser.password, parsedUser.name);
            console.log("ID: " + user.getId());
            if(user.getName() !== null) {
                setName(user.getName());
                setUsername(user.getUsername());
                setPassword(user.getPassword());
            }
        }
    },[userJSON])

    return (
        <>
          <form>
                <Form.Group className="wrapper-request-div">
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            <h6>Name</h6>
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                value = {name}
                                disabled
                                required
                                type = "text"
                                placeholder = {name}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            <h6>Username</h6>
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                value = {username}
                                disabled 
                                type = "text"
                                placeholder = {username}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            <h6>Password</h6>
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                value = {password}
                                disabled 
                                type = "text"
                                placeholder = {password}
                            />
                        </Col>
                    </Form.Group>
                </Form.Group>
            </form>
      </>

    );
}
