import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Container } from 'react-bootstrap';

const Orders = () => {
  const [allOrders, setOrders] =  useState({});

  const fetchCartItems = () => {
    fetch(`https://my-canteen-management-dfa9b-default-rtdb.firebaseio.com/orders.json`)
      .then(res => res.json())
      .then(data => {
        data ? setOrders(data) : setOrders({});
      });
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  const renderItems = (customer, orders) => {
    return <Container>
      <Row>Order details for  - {customer} </Row>
      <Row>
        <Col>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Quantity</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Review</th>
            </tr>
          </thead>
          {
          Object.values(orders).map(data => {
            const { review = '' } = data;
            return  <tbody>
            <tr>
              <td><img src={data.image} alt="test" width="120px"></img></td>
              <td>{data.quantity}</td>
              <td>{data.itemName}</td>
              <td>₹{data.quantity*data.price}</td>
              <td>{review}</td>
            </tr>
          </tbody>
          })
        }
        </Table>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  }

  console.log("#######orders", allOrders)
  
  return(<div>
    {
      Object.keys(allOrders).map(customer => renderItems(customer, allOrders[customer]))
    }
  </div>)
}

export default Orders;