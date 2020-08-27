import React, {useState, useEffect} from 'react';
import TableView from './common/TableView';
import {BASE_URL, REST_API, DATE_FORMAT} from '../Constants';
import moment from 'moment';
import PageHeading from './common/PageHeading';

function Invoice(){
    const [data, setInvoiceData] = useState([]);
    const [totalInvoices, setTotalInvoices] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const getInvoiceData = () => {
        var url= BASE_URL+REST_API.GET_INVOICE;
        fetch(url, {
            method: 'GET',
        }).then(response => {
            return response.json();
        }).then(res => {
            setInvoiceData(res.invoices);
            setTotalInvoices(res.totalInvoices);
            setTotalCustomers(res.totalCustomers);
        });
    }

    // delete user data by user Id
    const deleteByInvoiceId = (id) => {
        var url = BASE_URL+REST_API.DELETE_INVOICE.replace('{id}', id);
        fetch(url, {
            method: 'DELETE',
        }).then(response => {
            if(response.status===200 || response.status===404){
                return response.json();
            }
        }).then(res => {
            if(res.errorMessage===undefined){
                setInvoiceData(data.filter(function(value){ return  value.id!==id;}))
            } else{
                console.log(res.errorMessage);
            }
        });
    }

    const downloadInvoice = (id) => {
        var url = BASE_URL+REST_API.DELETE_INVOICE.replace('{id}', id);
        fetch(url, {
            method: 'DELETE',
        }).then(response => {
            if(response.status===200 || response.status===404){
                return response.json();
            }
        }).then(res => {
            if(res.errorMessage===undefined){
                setInvoiceData(data.filter(function(value){ return  value.id!==id;}))
            } else{
                console.log(res.errorMessage);
            }
        });
    }

    useEffect(() => {
        getInvoiceData();
      }, []);

    const tableHeader = ["Customer Name", "Reference Number", "Date"];
    return(
        <>
            <PageHeading title='Invoices' />
            <TableView header={tableHeader} body={data} delete={deleteByInvoiceId}
                download={downloadInvoice}>
            </TableView>
        </>
    );
}

export default Invoice;