import React, { Fragment, useEffect, useState } from 'react';
import { Card, Button, Row, Col, Spinner } from 'react-bootstrap';

const ViewFoodItems = (props) => {
  const [data, setData] = useState('');
  const [loading, setLoader] = useState(true);

  const fetchItems = () => {
    fetch('https://my-canteen-management-default-rtdb.firebaseio.com/menuItems.json')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoader(false);
      });
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const updateItem = (id) => {
    props.history.push(`edit-food-items/${id}`)
  }

  const deleteItem = (id) => {
    fetch(`https://my-canteen-management-default-rtdb.firebaseio.com/menuItems/${id}.json`, {
      method: 'DELETE',
    }).then(res => Promise.all([res, res.json()]))
    .then(() => fetchItems());
  }

  console.log(data);

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
        </Button></h2>}
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
                  <Col><Button variant="success" size="sm" onClick={() => updateItem(d.id)}>Update</Button></Col>
                  <Col><Button variant="success" size="sm" onClick={() => deleteItem(d.id)}>Delete</Button></Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>}

    </Fragment>)
}
export default ViewFoodItems;