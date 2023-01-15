import React from 'react';
import Header from '../Common/Header/Header';
import { Route } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import CustomerLogin from './CustomerLogin';
import CustomerSignUp from './CustomerSignup';
import { Carousel, Row, Col } from 'react-bootstrap';
import Kadhai from '../assets/img2.jpg';
import Masala from '../assets/img3.jpg';
import Mushroom from '../assets/img4.jpg';
import './Homepage.css';
import Footer from '../Common/Footer/Footer';
import ViewFoodItems from '../Customer/ViewFoodItems/ViewFoodItems';

const HomePage = (props) => {
  console.log(props)
  const {match: {url}, location :{pathname}} = props;
  const navItems = [
    {item: 'Admin', url: 'admin-login'},
    {item: 'Customer', url: 'customer-login'},
    {item: 'Sign Up', url: 'signup'}];
  return <div>
    <Header navItems={navItems} {...props}/>
    <Route path={`${url}admin-login`} component={AdminLogin} />
    <Route path={`${url}customer-login`} component={CustomerLogin} />
    <Route path={`${url}signup`} component={CustomerSignUp} />
    {pathname === '/' && <div style={{ backgroundColor: "#FFFDD0", height: "85vh" }}>
      <Row>
        <Col style={{ paddingLeft: "170px", paddingRight: "170px" }}>
          <Carousel style={{height: '100px'}}>
          <Carousel.Item interval={1500}>
            <img
              className="d-block w-100"
              src={Kadhai}
              alt="First slide"
              height="520px"
            />
          </Carousel.Item>
          <Carousel.Item interval={1500}>
            <img
              className="d-block w-100"
              src={Masala}
              alt="Second slide"
              height="520px"
            />
          </Carousel.Item>
          <Carousel.Item interval={1500}>
            <img
              className="d-block w-100"
              src={Mushroom}
              alt="Third slide"
              height="520px"
            />
          </Carousel.Item>
        </Carousel>
        </Col>
      </Row>
    </div>}
    <fragment>
      < ViewFoodItems/>
    </fragment>
    <Footer />
  </div>
}

export default HomePage;