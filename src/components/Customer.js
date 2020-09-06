import React, { useState, useEffect } from 'react';
import TableView from './common/TableView';
import { BASE_URL, REST_API } from '../Constants';
import PageHeading from './common/PageHeading';
import { useHistory } from 'react-router-dom';

function Customer(props) {

    let history = useHistory();
    const [data, setCustomerData] = useState([]);
    // get all customers data
    const getCustomerData = () => {
        var url = BASE_URL + REST_API.GET_ALL_CUSTOMER;
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
        var url = BASE_URL + REST_API.DELETE_CUSTOMER.replace('{id}', id);
        fetch(url, {
            method: 'DELETE',
        }).then(response => {
            if (response.status === 204) {
                setCustomerData(data.filter(function (value) { return value.id !== id; }))
            }
        }).catch(res => {
            console.log("error");
        });
    }

    // redirect To Edit Customer Screen
    const redirectToEditCustomerScreen = (id) => {
        history.push({ pathname: "/customer/edit/" + id });
    }

    useEffect(() => {
        getCustomerData();
    }, []);

    const tableHeader = ["Customer Name", "Date"];
    return (
        <>
            <PageHeading title='Customers' />
            <TableView header={tableHeader} body={data} delete={deleteByCustomerId}
                edit={redirectToEditCustomerScreen}>
            </TableView>
        </>
    );
}

export default Customer;