import React from 'react';
import {Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Styles} from './css/Styles'

export default function Menu(){
    return (
            <Nav className="flex-column" style={Styles.menu}>
                <Nav className="menu-item"  style={Styles.menuItem}><Link to="/invoice">Invoice List</Link></Nav>
                <Nav className="menu-item" style={Styles.menuItem}><Link to="/invoice/create">New Invoice</Link></Nav>
                <Nav className="menu-item" style={Styles.menuItem}><Link to="/customer">Customer Details</Link></Nav>
                <Nav className="menu-item" style={Styles.menuItem}><Link to="/customer/add">Add Customer</Link></Nav>
            </Nav>
    );
}
