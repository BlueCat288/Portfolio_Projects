import { useState } from 'react'
import Login from '../../components/access/Login.component';
import SignUp from '../../components/access/Signup.component';
import { Col, Row, Container} from 'react-bootstrap';
import '../../css/home-access.css';
import Logo from '../../image/yelp.svg'


export default function HomeAccess()  {

  const [currentAuthMode, setCurrentAuthMode] = useState("login");

  const RenderMode = () => {
    if(currentAuthMode === "login") {
      return <Login/>;
    }
    if(currentAuthMode === "signup") {
      return <SignUp/>;
    }

    return null;
  }
    return (
      <div className="body"> 
          <Container className="home-wrapper">
            <Row>
              <Col className="left-wrapper">
                <img alt="" src={Logo} style={{float: "right", width: '25%'}}/>
                <br></br>
                <h2>Welcome to Welp.</h2> 
              </Col>
              
              <Col className="right-wrapper">
                <Container className="right-wrapper-links">
                  <span className="link-span" onClick={() => {setCurrentAuthMode("login")}}> Sign in</span>
                  <span> or</span>
                  <span className="link-span" onClick={() => {setCurrentAuthMode("signup")}}> Sign up</span>
                </Container>

                <RenderMode/>
              </Col>
            </Row>
          </Container> 
      </div>
           
    )
}

