import SearchBar from '../User/SearchBar.component';
import '../../css/landing-page.css';
import Logo from '../../image/yelp.svg';
import Img_1 from '../../image/1.jpg';
import Img_2 from '../../image/2.jpg';
import Img_3 from '../../image/3.jpg';

import {Carousel} from 'react-bootstrap';


export default function LandingPage() {
  return (
    <>
      <div className="landing-wrapper"> 
          <Carousel >
            <Carousel.Item interval={2000} data-pause="false">
              <img
                className=""
                src={Img_1}
                alt=""
              />

            </Carousel.Item>
            <Carousel.Item interval={1000} data-pause="false">
              <img
                className=""
                src={Img_2}
                alt=""
              />

            </Carousel.Item>
            <Carousel.Item data-pause="false">
              <img
                className=""
                src={Img_3}
                alt=""
              />

            </Carousel.Item>
          </Carousel>
        </div>

        <div className="search-wrapper">
          <div className="title-wrapper" style={{paddingBottom: '100px'}}>
              <h1 style={{color: 'white'}}>Welp</h1> <img alt="" src={Logo} style={{float: "right", width: '10%'}}/>
          </div>
          <SearchBar/>
        </div>
       
    </>
  );
}
