import React, { useEffect, useState } from 'react';
import { Form, Button, Image, Row, Col, Container } from 'react-bootstrap';
import {generateUniqId} from '../../utils/index';
import './AddFoodItem.css'

const AddFoodItem = (props) => {
  const [state, setState] = useState({
    itemName: '',
    price: '',
    image: '',
    id: ''
  });

  useEffect(() => {
    const { match: {params : { itemId } } } =  props;
    console.log("effect", itemId)
    if(itemId) {
      console.log("inside effect", itemId)
      fetch(`https://my-canteen-management-default-rtdb.firebaseio.com/menuItems/${itemId}.json`)
      .then(res => res.json())
      .then(data => {
        setState({
          ...data
        })
      });
    }
  }, [props]);

  const handleItemName = (e) => {
    setState({
      ...state,
      itemName: e.target.value,
    })
  }

  const handleItemPrice = (e) => {
    setState({
      ...state,
      price: e.target.value,
    })
  }

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if(reader.readyState === 2) {
        setState({...state, image: reader.result});
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  const addEditFoodItems = () => {
    const { id } = state;
    const itemId = id === '' ? generateUniqId() : id;
    console.log("editttt", state)
    fetch(`https://my-canteen-management-default-rtdb.firebaseio.com/menuItems/${itemId}.json`, {
      method: 'PATCH',
      body: JSON.stringify({ ...state, id: itemId })
    }).then(res => Promise.all([res, res.json()]))
    .then(() => console.log("Added successfully!!!!!"));
    
    setState({
      itemName: '',
      price: '',
      image: '',
      id: '',
    });
  }

  const { itemName, price, image, id } = state;

  const disableAdd = itemName === '' || price === '' || image === '';
  const heading = id === '' ? 'Add a Food Item' : 'Edit Food Item';
  const buttonCaption = id === '' ? 'Add' : 'Update';

  console.log("state", state)

  return <div className="bg-image">
    <Container>
      <h2>{heading}</h2>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Food Item Name:</Form.Label>
              <Form.Control type="text" value={itemName} onChange={handleItemName} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Price:</Form.Label>
              <Form.Control type="text" value={price} onChange={handleItemPrice} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Image Upload:</Form.Label>
              <Form.Control type="file" accept='image/*' onChange={imageHandler}/>
            </Form.Group>
            <Button disabled={disableAdd} variant="success" onClick={addEditFoodItems}>{buttonCaption}</Button>
          </Form>
        </Col>
        <Col>{state.image && <Image src={state.image} thumbnail />}</Col>
      </Row>
    </Container>
  </div>
}

export default AddFoodItem;