import React, { Fragment, useEffect, useState } from 'react';
import { Card, Button, Row, Col, Spinner } from 'react-bootstrap';

const ViewFoodItems = (props) => {
  const [data, setData] = useState('');
  const [loading, setLoader] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const fetchItems = () => {
    fetch('https://my-canteen-management-default-rtdb.firebaseio.com/menuItems.json')
      .then(res => res.json())
      .then(data => {
        const newData = Object.values(data).map(d => Object.assign(d, { quantity: 1 }));
        setData(newData);
        setLoader(false);
      });
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const addToCart = (item) => {
    const cartData = [...cartItems, { ...item }];
    const customerId = sessionStorage.getItem("loggedInCustomer");
    setCartItems([...cartData])
    console.log("cartData", cartData)
    fetch(`https://my-canteen-management-default-rtdb.firebaseio.com/cartItems/${customerId}.json`, {
      method: 'PATCH',
      body: JSON.stringify({ ...cartData })
    }).then(res => Promise.all([res, res.json()]))
    .then(() => console.log("Items added to Cart successfully!!!!!"));
    // localStorage.setItem("cartData", JSON.stringify(cartData))
  }

  const incrementQty = (val, indx) => {
    let newVal;
    if(val.quantity<10){
      newVal = {...val, quantity: val.quantity +1};
      data[indx]= {...newVal};
      setData({...data});
    }
  }

  const decrementQty = (val, indx) => {
    let newVal;
    if(val.quantity>1){
      newVal = {...val, quantity: val.quantity - 1};
      data[indx]= {...newVal};
      setData({...data});
    }
  }

  return(<Fragment>
      {loading && <h2>
        <Button variant="secondary" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
        </h2>}
      {!loading && <Row xs={6} md={4} className="g-4">
        {data !== '' && Object.values(data).map((d, idx) => (
          <Col>
            <Card>
              <Card.Img variant="top" src={d.image} width="270px" height="200px" />
              <Card.Body>
                <Row>
                  <Col><Card.Text>{d.itemName}</Card.Text></Col>
                  <Col><Card.Text>₹{d.price}</Card.Text></Col>
                </Row>
                <Row>
                  <Col>
                    <Row>
                      <Col><Button variant="success" size="sm" onClick={()=>incrementQty(d, idx)}>+</Button></Col>
                      <Col> {d.quantity}</Col>
                      <Col><Button variant="success" size="sm" onClick={()=>decrementQty(d, idx)}>-</Button></Col>
                    </Row>
                  </Col>
                  <Col>
                    <Button variant="success" size="sm" onClick={() => addToCart(d)}>Add To Cart</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>}

    </Fragment>)
}
export default ViewFoodItems;