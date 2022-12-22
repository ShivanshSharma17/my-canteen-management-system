import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const AdminLogin = (props) => {
  const [state, setState] = useState({
    adminId: '',
    password: '',
  });

  const loginAdmin = () => {
    props.history.push('/admin');
    setState({
      adminId: '',
      password: '',
    });
  }

  const handleAdminId = (e) => {
    setState({
      ...state,
      adminId: e.target.value,
    });
  }

  const handlePassword = (e) => {
    setState({
      ...state,
      password: e.target.value,
    });
  }

  const {adminId, password} = state;
  const disableLogin = adminId === '' || password === '';

  return <div className="bg-image">
    <Container>
    <Row>
      <Col>
        <h3>Dear Admin, Login Here</h3>
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Admin Id:</Form.Label>
          <Form.Control type="text" value={adminId} placeholder="Enter admin ID" onChange={handleAdminId} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} placeholder="Enter password" onChange={handlePassword} />
        </Form.Group>
          <Button disabled={disableLogin} variant="success" onClick={loginAdmin}>Login</Button>
        </Form>
      </Col>
      <Col></Col>
    </Row>
  </Container>
    </div>
}

export default AdminLogin;