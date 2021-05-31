 import {FormEvent, useState} from 'react';
import {Form, Col, Container} from 'react-bootstrap';
import '../../css/signup.css';
import UserController from '../../controller/User.controller';
import NewUser from '../../entity/NewUser.entity';
import { AxiosResponse } from 'axios';

export default function Signup() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const userController = new UserController();

    /**
     * Sends request to the server, inserting a new user
     * @param e FormEvent
     * @returns inserting new user
     */
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const user: NewUser = new NewUser(username, password, name);
        return await userController.insertUser(user)
            .then((response: AxiosResponse<any>) => {
                try {
                    console.log(response);
                } catch (e) {
                    console.error(e);
                }
            });
    }

    //TO-DOs: 
    //check if user is already Exist
    //check if field is empty

  return (
    <Container className="signup-wrapper">
        <Form>
            <Col>
                <h1>
                    New Account
                </h1>
            </Col>

            <Col>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    required
                    value = {name}
                    type = "text"
                    placeholder = "Full Name"
                    onChange = {e => setName(e.target.value)}
                />
            </Col>

            <Col>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    required
                    value = {username}
                    type = "text"
                    placeholder = "Username"
                    onChange = {e => setUsername(e.target.value)}
                />
            </Col>

            <Col>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    value = {password}
                    type = "password"
                    placeholder = "Password"
                    onChange = {e => setPassword(e.target.value)}
                />
            </Col>
        
            <Col className="wrapper-button">
                <button type="submit" onClick={onSubmit}>Sign Up</button>
            </Col>
            
        </Form>
    </Container>
  );
}
