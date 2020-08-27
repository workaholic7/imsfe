import React from 'react';
import {Nav} from 'react-bootstrap';
import {Link} from '@reach/router';

export default function Menu(){
    return (
            <Nav className="flex-column" style={styles.menu}>
                <Nav className="menu-item"  style={styles.menuItem}><Link to="/invoice">Invoice List</Link></Nav>
                <Nav className="menu-item" style={styles.menuItem}><Link to="/invoice/create">New Invoice</Link></Nav>
                <Nav className="menu-item" style={styles.menuItem}><Link to="/customer">Customer Details</Link></Nav>
                <Nav className="menu-item" style={styles.menuItem}><Link to="/customer/add">Add Customer</Link></Nav>
            </Nav>
    );
}

const styles= {
    sideMenu:{
        
        width : '200px',
    },
    menu : {
        // position : 'fixed',
        // left : '0px',
        // top : '0px',
        width : '200px',
        height: '100%',
        // height: '100%',
        background: '#cccccc',
    },

    menuItem:{
        height: '10%',
        paddingTop: '10px',
        background: ''
    }
}