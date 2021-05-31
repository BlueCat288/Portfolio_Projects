import './App.css';
import HomeAccess from'./components/access/HomeAccess.component';
import Home from './components/User/Home.component';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LandingPage from './components/User/LandingPage.component';

export default function App() {
    // const [auth, setAuth] = useState(true);
    return (
      <Router>
        <div className="App">
        <Switch>

          <Route exact path="/">
            <HomeAccess/>
          </Route> 

          <Route path="/search">
            <Home/>
          </Route>

          <Route path="/home">
            <LandingPage/>
          </Route>

          {/* <Route path="/search">
            <SearchBar/>
          </Route> */}

          <Route path="*" component={() => "404 NOT FOUND!"} />
        </Switch>
        </div>
      </Router>
    );
  }
  

