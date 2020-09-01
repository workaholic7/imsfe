import React from 'react';
import './App.css';
import {Router} from '@reach/router';
import Invoice from './components/Invoice';
import CreateInvoice from './components/CreateInvoice';
import Customer from './components/Customer';
import AddCustomer from './components/AddCustomer';
import EditCustomer from './components/EditCustomer';
import Menu from './components/Menu';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container fluid className="App" style={styles.fullHeight}>
      <Row style={styles.fullHeight}>
        <Col xl={2} md={2} style={{padding: '0px'}}>
        <Menu />
      </Col>
      <Col xl={9}  md={9}>
      <Router>
        <Invoice path="/" />
        <Invoice path='/invoice'/>
        <CreateInvoice path='/invoice/create'/>
        <Customer path='/customer'/>
        <AddCustomer path='/customer/add'/>
        <EditCustomer path='/customer/edit'/>
      </Router>
      </Col>
      </Row>
    </Container>
  );
}

export default App;

const styles={
  fullHeight:{
    height: '100%',
  }
}
