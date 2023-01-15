import React from 'react';
import Header from '../Common/Header/Header';
import Cart from './Cart/Cart';
import ViewFoodItems from './ViewFoodItems/ViewFoodItems';
import { Redirect, Route } from 'react-router-dom';
import Checkout from './Cart/Checkout';
import MyOrders from './Cart/MyOrders';

const CustomerPage = (props) => {
  const navItems = [
    {item: 'View Food Items', url: '/view-food-items'},
    {item: 'Cart', url: '/cart'},
    {item: 'My Orders', url: '/my-orders'},
    // {item : 'Logout' , url: '#'}
  ];

  const {match: {url}} = props;
  

  return <div>
    <Header navItems={navItems} {...props} loggedIn={sessionStorage.getItem("loggedInCustomer")} />
    <Route path={`${url}/view-food-items`} component={ViewFoodItems} />
    <Route path={`${url}/cart`} component={Cart} />
    <Route path={`${url}/checkout`} component={Checkout} />
    <Route path={`${url}/my-orders`} component={MyOrders} />
    <Redirect from='/customer' to={`${url}/view-food-items`}  />
  </div>
}

export default CustomerPage;