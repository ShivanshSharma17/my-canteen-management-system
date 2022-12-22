import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const CustomerLogin = (props) => {
  const [state, setState] = useState({
    customerId: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const login = async() => {
    const { customerId } = state;
    let userExists;
    await fetch(`https://my-canteen-management-default-rtdb.firebaseio.com/customerData/${customerId}.json`)
      .then(res => res.json())
      .then(data => {
        userExists = data === null ? false : true;
    });
    if(userExists){
      props.history.push('/customer');
      sessionStorage.setItem("loggedInCustomer", customerId);
      setState({
        customerId: '',
        password: '',
      });
    }else {
      setMessage('This customerID does not exist!! Please signup first!!')
    }
  }

  const handleCustId = (e) => {
    setState({
      ...state,
      customerId: e.target.value,
    });
  }

  const handlePassword = (e) => {
    setState({
      ...state,
      password: e.target.value,
    });
  }

  const {customerId, password} = state;
  const disableLogin = customerId === '' || password === '';

  return <div className="bg-image">
      <Container>
        <Row>
          <Col>
            <h2>Dear Customer, Login Here</h2>
            {message !== '' && <Alert variant="warning">
              {message}
            </Alert>}
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Customer Id:</Form.Label>
              <Form.Control type="text" value={customerId} placeholder="Enter customer email ID" onChange={handleCustId} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} placeholder="Enter password" onChange={handlePassword} />
            </Form.Group>
              <Button disabled={disableLogin} variant="success" onClick={login}>Login</Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
}

export default CustomerLogin;