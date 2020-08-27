import React, {useState, useEffect} from 'react';
import TableView from './common/TableView';
import {BASE_URL, REST_API} from '../Constants';
import PageHeading from './common/PageHeading';

function Customer(props){
    const [data, setCustomerData] = useState([]);
    // get all customers data
    const getCustomerData = () => {
        var url= BASE_URL+REST_API.GET_ALL_CUSTOMER;
        fetch(url, {
            method: 'GET',
        }).then(response => {
            return response.json();
        }).then(res => {
            setCustomerData(res);
        });
    }

    // delete customer data by customer Id
    const deleteByCustomerId = (id) => {
        var url = BASE_URL+REST_API.DELETE_CUSTOMER.replace('{id}', id);
        fetch(url, {
            method: 'DELETE',
        }).then(response => {
            if(response.status===200 || response.status===404){
                return response.json();
            }
        }).then(res => {
            if(res.errorMessage===undefined){
                setCustomerData(data.filter(function(value){ return  value.id!==id;}))
            } else{
                console.log(res.errorMessage);
            }
        });
    }

    // get user data and then pass data to user update screen for updating
    const getCustomerDataById = (id) => {
        var url = BASE_URL+REST_API.GET_CUSTOMER.replace("{id}", id)
        fetch(url , {
            method: 'GET',
        }).then(response => {
            return response.json();
        }).then(res => {
            props.history.push('/customer/edit', res);
        });
    } 

    useEffect(() => {
        getCustomerData();
      }, []);

    const tableHeader = ["Customer Name", "Date"];
    return(
        <>
        <PageHeading title='Customers' />
        <TableView header={tableHeader} body={data} delete={deleteByCustomerId}
             edit={getCustomerDataById}>
        </TableView>
        </>
    );
}

export default Customer;