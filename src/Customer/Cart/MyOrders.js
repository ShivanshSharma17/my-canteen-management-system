import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Container, Modal, Button } from 'react-bootstrap';
import Footer from '../../Common/Footer/Footer';

const MyOrders = () => {
  const [myorders, setMyorders] =  useState([]);
  const [showModal, setModal] = useState(false);
  const [comments, setComment] =useState('');
  const [reviewId, setReviewId] = useState('');

  const handlereview=(id)=>{
    setModal(true);
    setReviewId(id);
  }

  const handleClose = () => {
    setModal(false);
  }

  const handleComment = (e) =>{
       setComment(e.target.value);
  }

  const handleSubmit = () =>{
     console.log(reviewId);
     const customerId = sessionStorage.getItem("loggedInCustomer")  
    //  console.log("######", {...myorders[reviewId], comment:comments})
     fetch(`https://my-canteen-management-dfa9b-default-rtdb.firebaseio.com/orders/${customerId}/${reviewId}.json`, {
      method: 'PATCH',
      body: JSON.stringify( {...myorders[reviewId], comment:comments})
    }).then(res => Promise.all([res, res.json()]))
    .then(() => console.log("Comment Updated successfully!!!!!"));
    handleClose();
  }


  const fetchCartItems = () => {
    const customerId = sessionStorage.getItem("loggedInCustomer")
    fetch(`https://my-canteen-management-dfa9b-default-rtdb.firebaseio.com/orders/${customerId}.json`)
      .then(res => res.json())
      .then(data => {
        data ? setMyorders(data) : setMyorders({});
      });
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

console.log("####", myorders)
  return <div>
    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please give your valuable comments</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>PLEASE LOGIN FIRST !!!</Modal.Body> */}
        <input type='text' value={comments} onChange={handleComment} ></input>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    {Object.values(myorders).length > 0 ? <Container>
      <Row>
        <Col>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Quantity</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>#</th>
            </tr>
          </thead>
          {
          Object.values(myorders).map(data => {
            const { image, quantity, itemName, price, comment = '' } = data;
            return <tbody>
            <tr>
              <td><img src={image} alt="test" width="120px"></img></td>
              <td>{quantity}</td>
              <td>{itemName}</td>
              <td>₹{quantity * price}</td>
              <td>{
              comment==='' ? <input type='button' value='Add Review' onClick={() => handlereview(data.id)}></input>
            : comment
            }</td>
            </tr>
          </tbody>
          })
        }
        </Table>
        </Col>
        <Col></Col>
      </Row>
    </Container>
    :
    <h3>No orders yet!!!!</h3>}
    <Footer></Footer>
  </div>
}
export default MyOrders;