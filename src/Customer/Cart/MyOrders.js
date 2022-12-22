import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Container } from 'react-bootstrap';

const MyOrders = () => {
  const [myorders, setMyorders] =  useState([]);

  const fetchCartItems = () => {
    const customerId = sessionStorage.getItem("loggedInCustomer")
    fetch(`https://my-canteen-management-default-rtdb.firebaseio.com/orders/${customerId}.json`)
      .then(res => res.json())
      .then(data => {
        data ? setMyorders(data) : setMyorders([]);
      });
  }

  useEffect(() => {
    fetchCartItems();
  }, []);


  return <div>
    {myorders.length > 0 ? <Container>
      <Row>
        <Col>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Quantity</th>
              <th>Item Name</th>
              <th>Price</th>
            </tr>
          </thead>
          {
          myorders.map(data => 
          <tbody>
            <tr>
              <td><img src={data.image} alt="test" width="120px"></img></td>
              <td>{data.quantity}</td>
              <td>{data.itemName}</td>
              <td>₹{data.quantity * data.price}</td>
            </tr>
          </tbody>)
        }
        </Table>
        </Col>
        <Col></Col>
      </Row>
    </Container>
    :
    <h3>No orders yet!!!!</h3>}
  </div>
}
export default MyOrders;