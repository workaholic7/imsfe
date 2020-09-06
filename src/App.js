import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Invoice from './components/Invoice';
import CreateInvoice from './components/CreateInvoice';
import Customer from './components/Customer';
import AddCustomer from './components/AddCustomer';
import EditCustomer from './components/EditCustomer';
import Menu from './components/Menu';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';

function App() {

  const [loggedIn, isLoggedIn] = useState(false);

  useEffect(() => {
    isLoggedIn(sessionStorage.getItem('authenticated'))
  }, [loggedIn])

  return (
    <Container fluid className="App" style={styles.fullHeight}>
      <Router>
        <Row style={styles.fullHeight}>
          {loggedIn ?
            <Col xl={2} md={2} style={{ padding: '0px' }}>
              <Menu />
            </Col> : <></>}
          <Col xl={loggedIn ? 9 : 12} md={loggedIn ? 9 : 12}>
            <Switch>
              <Route exact path="/" >
                {loggedIn ? <Redirect to="/invoice" /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/login">
                {loggedIn ? <Redirect to="/invoice" /> : <Login />}
              </Route>
              <Route exact path="/invoice" >
                {loggedIn ? <Invoice /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/invoice/create">
                {loggedIn ? <CreateInvoice /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/customer">
                {loggedIn ? <Customer /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/customer/add">
                {loggedIn ? <AddCustomer /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/customer/edit/:id">
                {loggedIn ? <EditCustomer /> : <Redirect to="/login" />}
              </Route>
            </Switch>
          </Col>
        </Row>
      </Router>
    </Container>
  );
}

export default App;

const styles = {
  fullHeight: {
    height: '100%',
  }
}
