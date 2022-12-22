import React, {useState} from 'react';
import { Form, Button, Alert, Row, Col, Container } from 'react-bootstrap';

const Checkout = (props) => {
  const {location: {state: {totalAmount, cartItems}}} = props;
  const [state, setState] = useState({
    cardNumber: '',
    cvv: '',
    total: totalAmount,
    cart: cartItems,
    success: ''
  });

  const handleCardNumber = (e) => {
    setState({
      ...state,
      cardNumber: e.target.value,
    })
  }

  const handleCVV = (e) => {
    setState({
      ...state,
      cvv: e.target.value,
    })
  }

  const handleMakePayment = async () => {
    const { cart } = state;
    const customerId = sessionStorage.getItem("loggedInCustomer");
    await fetch(`https://my-canteen-management-default-rtdb.firebaseio.com/orders/${customerId}.json`, {
      method: 'PATCH',
      body: JSON.stringify({ ...cart })
    });
    fetch(`https://my-canteen-management-default-rtdb.firebaseio.com/cartItems/${customerId}.json`, {
      method: 'DELETE',
    }).then(res => Promise.all([res, res.json()]))
    .then(() => console.log("Sucess!!!"));
    setState({
      cardNumber: '',
      cvv: '',
      total: '',
      cart: '',
      success: 'Order Successful!!!!!'
    });
    setTimeout(()=> setState({...state, success: ''}), 10000)
  }

  const { cardNumber, cvv, total, success } = state;
  const disableMakePayment = cardNumber === '' || cvv === '';

  return <div className='bg-image'>
     <Container>
      <h2>Payment!!!</h2>
        {success !== '' && <Alert variant="success">
          {success}
        </Alert>}
     {
       total !== '' &&  <Row>
       <Col>
         <Alert variant="danger">
           Payable Amount: ₹{total}
         </Alert>
         <Form>
           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
             <Form.Label>Card No:</Form.Label>
             <Form.Control type="text" value={cardNumber} onChange={handleCardNumber} />
           </Form.Group>
           <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
             <Form.Label>CVV:</Form.Label>
             <Form.Control type="text" value={cvv} onChange={handleCVV} />
           </Form.Group>
         </Form>
       </Col>
       <Col><Button disabled={disableMakePayment} variant="success" onClick={handleMakePayment}>Make Payment</Button></Col>
     </Row>
     }
    </Container>
  </div>
}

export default Checkout;