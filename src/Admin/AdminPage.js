import React from 'react';
import Header from '../Common/Header/Header';
import AddFoodItem from './AddFood/AddFoodItem';
import ViewFoodItems from './ViewFoodItems/ViewFoodItems';
import { Redirect, Route } from 'react-router-dom';
import Orders from './Orders/Orders';

const AdminPage = (props) => {
  const navItems = [
    {item: 'Add Food Item', url: '/add-food-item'},
    {item: 'View Items', url: '/view-items'},
    {item: 'Orders', url: '/orders'},
  ];

  const {match: {url}} = props;

  return <div>
    <Header navItems={navItems} loggedIn='Admin' {...props} />
    <Route path={`${url}/edit-food-items/:itemId`} component={AddFoodItem} />
    <Route path={`${url}/add-food-item`} component={AddFoodItem} />
    <Route path={`${url}/view-items`} component={ViewFoodItems} />
    <Route path={`${url}/orders`} component={Orders} />
    <Redirect from='/admin' to={`${url}/add-food-item`}  />
  </div>
}

export default AdminPage