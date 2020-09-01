import React, {useState, useEffect} from 'react';
import TableView from './common/TableView';
import {BASE_URL, REST_API} from '../Constants';
import PageHeading from './common/PageHeading';
import Count from './common/Count';

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
        }).catch(err=>{
            console.log("error");
        });
    }

    // delete user data by user Id
    const deleteByInvoiceId = (id) => {
        var url = BASE_URL+REST_API.DELETE_INVOICE.replace('{id}', id);
        fetch(url, {
            method: 'DELETE',
        }).then(response => {
            if(response.status===204){
                setInvoiceData(data.filter(function(value){ return  value.id!==id;}))
            }
        }).catch(err=>{
            console.log(err);
        });
    }

    const downloadInvoice = (id , refNum) => {
        const fileName = 'Invoice_'+refNum;
        var url = BASE_URL+REST_API.DOWNLOAD_INVOICE.replace('{id}', id);
        fetch(url, {
            method: 'GET',
        }).then(response => {
            if(response.status===200){
                return response.blob();
            }
        }).then(blob => {
            let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = fileName;
					a.click();
        }).catch(err=>{
            console.log(err);
        });
    }

    useEffect(() => {
        getInvoiceData();
      }, []);

    const tableHeader = ["Customer Name", "Reference Number", "Date"];
    return(
        <>
            <PageHeading title='Invoices' />
            <Count />
            <TableView header={tableHeader} body={data} delete={deleteByInvoiceId}
                download={downloadInvoice} downloadFileName="referenceNum">
            </TableView>
        </>
    );
}

export default Invoice;