import React, {Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AdminPage from './Admin/AdminPage';
import HomePage from './HomePage/HomePage';
import CustomerPage from './Customer/CustomerPage';
import './App.css';

function App() {
  return (
    <div className="App">
        <Router>
          <Suspense fallback={<div />}>
            <Switch>
              <Route path='/admin' component={AdminPage} />
              <Route path='/customer' component={CustomerPage} />
              <Route path='' component={HomePage} />
            </Switch>
          </Suspense>
        </Router>
    </div>
  );
}

export default App;
