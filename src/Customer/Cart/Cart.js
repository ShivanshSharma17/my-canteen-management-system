import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Table, Container } from 'react-bootstrap';

const Cart = (props) => {
  console.log("cart", props)
  const [cartData, setCartData] =  useState({});
  const [totalAmount, setTotalAmount] =  useState(0);

  const fetchCartItems = () => {
    const customerId = sessionStorage.getItem("loggedInCustomer")
    fetch(`https://my-canteen-management-dfa9b-default-rtdb.firebaseio.com/cartItems/${customerId}.json`)
      .then(res => res.json())
      .then(data => {
        data ? setCartData(data) : setCartData({});
        data ? setTotalAmount(Object.values(data).reduce((acc,d) => acc+(d.quantity * d.price),0)) :  setTotalAmount(0);
      });
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleCheckout = () => {
    props.history.push({
      pathname: '/customer/checkout',
      state: {
        totalAmount:  totalAmount,
        cartItems: cartData
      }
    })
  }
  console.log("#######", cartData, totalAmount)
  return <div className='bg-image'>
      {Object.values(cartData).length > 0 ? <Container>
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
          Object.values(cartData).map(data => 
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
      Total Payable Bill:: ₹{totalAmount}
      <Button onClick={handleCheckout} variant="success">Checkout</Button>
    </Container>
    :
    <h3>Add Items First!!!!</h3>}
  </div>
}

export default Cart;