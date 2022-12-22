import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const CustomerSignUp = (props) => {
  const [state, setState] = useState({
    customerId: '',
    phone: '',
    password: '',
    message: '',
    OTP: '',
    randomOtp: '',
    otpCounter: 0,
    otpStatus: false,
  });

  const handleCustomerId = (e) => {
    setState({
      ...state,
      customerId: e.target.value,
    });
  }

  const handleCustomerPhone = (e) => {
    setState({
      ...state,
      phone: e.target.value,
    });
  }

  const handlePassword = (e) => {
    setState({
      ...state,
      password: e.target.value,
    });
  }

  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    setState(prevState=>({
      ...state,
        otpStatus: true,
        randomOtp: otp,
        otpCounter:prevState.otpCounter + 1,
    }))
    console.log('System Generated Otp for user' + otp)
    console.log('times otp generated' + state.otpCounter)
}

  const handleOTP = (e) => {
  setState({
    ...state,
      OTP: parseInt(e.target.value),
  })
}

  const signUp = async () => {
const {OTP,randomOtp} = state;
    console.log(OTP, randomOtp)
    if(OTP===randomOtp){
      console.log("#######", "equal")
    let userExists;
    await fetch(`https://my-canteen-management-default-rtdb.firebaseio.com/customerData/${customerId}.json`)
      .then(res => res.json())
      .then(data => {
        userExists = data === null ? false : true;
    });
    userExists ? setState({...state, message: 'User with this id already exists!! Please use a different userId'}) 
      :
    setState({ ...state });
    if(!userExists){
      fetch(`https://my-canteen-management-default-rtdb.firebaseio.com/customerData/${customerId}.json`, {
      method: 'PATCH',
      body: JSON.stringify({ ...state })
    }).then(res => Promise.all([res, res.json()]))
    .then(() => console.log("Added successfully!!!!!"));
    props.history.push('/customer-login');
    setState({
      ...state,
      customerId: '',
      phone: '',
      password: '',
    });
    } 
  }else
  setState({...state, message: 'Please Enter Correct OTP!!!!'});
  }

  const {customerId, password, phone, message, otpStatus} = state;
  const disableLogin = customerId === '' || password === '';

  return <div className="bg-image">
      <Container>
        <Row>
          <Col>
            <h2>Sign Up here</h2>
            {message !== '' && <Alert variant="danger">
              {message}
            </Alert>}
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Customer Id:</Form.Label>
                <Form.Control type="text" value={customerId} onChange={handleCustomerId} placeholder="Enter your ID" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Phone No:</Form.Label>
                <Form.Control type="text" value={phone} onChange={handleCustomerPhone} placeholder="Enter your phone" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={handlePassword} placeholder="Enter password" />
              </Form.Group>
              <Button 
              // disabled={disableLogin} 
              variant="success" onClick={generateOTP}>Send OTP</Button>
              {otpStatus &&  <Form.Group>
                <Form.Label className="mb3">Enter OTP !!!</Form.Label>
                <Form.Control type="text"  onChange={handleOTP} placeholder="Enter OTP" />
                <Button disabled={disableLogin} variant="success" onClick={signUp}>Sign Up</Button>
              </Form.Group>
              }
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
}

export default CustomerSignUp;