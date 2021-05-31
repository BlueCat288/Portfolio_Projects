import {useState, useEffect, FormEvent} from 'react';
import {Form, Col, Container} from 'react-bootstrap';
import '../../css/signup.css';
import {useHistory} from 'react-router-dom';
import UserController from '../../controller/User.controller';
import User from "../../entity/User.entity";


export default function Login() {
    const userController = new UserController();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameExists, setUsernameExists] = useState(true);
    const [incorrectPassword, setIncorrectPassword] = useState(false);

    const [auth, setAuth] = useState(false);
    const history = useHistory();

    useEffect(() => {
      if(auth === true) {
        history.replace('/home');
      }
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        verifyUser()
        .then((user: User | null) => {
            if(user !== null) {
                const userJSON = user.toJSON(true);
                localStorage.setItem("user", JSON.stringify(userJSON));
                setAuth(true);
            }
        });
        
    };

    const verifyUser = async () => {
        console.log(usernameExists);
        const users = await userController.getAllUsers();
        // setFilteredUsers(users.filter((user: User) => user.getUsername() === username));
        const filteredUsers = users.filter((user: User) => user.getUsername() === username);
        if(filteredUsers.length === 0 ) {
            setUsernameExists(false);
            return null;
        } else if(filteredUsers[0].getPassword() !== password) {
            setIncorrectPassword(true);
            return null;
        } 
        return filteredUsers[0];
    }


  return (
    <Container className="signup-wrapper">
        <Form>
            <Col>
                <h1>
                    Sign In
                </h1>
            </Col>

            <Col>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    required
                    value = {username}
                    type = "text"
                    placeholder = "username"
                    onChange = {e => setUsername(e.target.value)}
                />
                {!usernameExists ? <span style = {{color:"red", fontSize: 12}}>Username does not exist.</span> : ""}
            </Col>

            <Col>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    value = {password}
                    type = "password"
                    placeholder = "password"
                    onChange = {e => setPassword(e.target.value)}
                />
                {incorrectPassword ? <span style = {{color:"red", fontSize: 12}}>Password is incorrect.</span> : ""}

            </Col>
        
            <Col className="wrapper-button">
                <button type="submit" onClick={onSubmit}>Sign In</button>
            </Col>
            
        </Form>
    </Container>
  );
}


