import React, { useState, useEffect } from 'react';
import TableView from './common/TableView';
import { BASE_URL, REST_API } from '../Constants';
import PageHeading from './common/PageHeading';
import Count from './common/Count';
import { Row, Col } from 'react-bootstrap';
import { faUser } from '@fortawesome/free-regular-svg-icons';

function Invoice() {
    const [data, setInvoiceData] = useState([]);
    const [totalInvoice, setTotalInvoice] = useState(0);
    const [totalCustomer, setTotalCustomer] = useState(0);
    const getInvoiceData = () => {
        var url = BASE_URL + REST_API.GET_INVOICE;
        fetch(url, {
            method: 'GET',
        }).then(response => {
            return response.json();
        }).then(res => {
            setInvoiceData(res.invoices);
            setTotalInvoice(res.totalInvoices);
            setTotalCustomer(res.totalCustomers);
        }).catch(err => {
            console.log("error");
        });
    }

    // delete user data by user Id
    const deleteByInvoiceId = (id) => {
        var url = BASE_URL + REST_API.DELETE_INVOICE.replace('{id}', id);
        fetch(url, {
            method: 'DELETE',
        }).then(response => {
            if (response.status === 204) {
                setInvoiceData(data.filter(function (value) { return value.id !== id; }))
            }
        }).catch(err => {
            console.log(err);
        });
    }

    const downloadInvoice = (id, refNum) => {
        const fileName = 'Invoice_' + refNum;
        var url = BASE_URL + REST_API.DOWNLOAD_INVOICE.replace('{id}', id);
        fetch(url, {
            method: 'GET',
        }).then(response => {
            if (response.status === 200) {
                return response.blob();
            }
        }).then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getInvoiceData();
    }, []);

    const tableHeader = ["Customer Name", "Reference Number", "Date"];
    return (
        <>
            <PageHeading title='Invoices' />
            <Row style={{marginBottom:'20px'}}>
                <Col xl={{ span: '3', offset: '6' }}>
                    <Count className="first-row" count={totalInvoice} text="Total Invoice" icon={<i class="fa fa-user fa-3x"></i>} />
                </Col>
                <Col xl={{span: '3'}} >
                <Count count={totalCustomer} text="Total Customer" icon={<i class="fa fa-shopping-cart fa-3x"></i>} />
                </Col>
            </Row>


            <TableView header={tableHeader} body={data} delete={deleteByInvoiceId}
                download={downloadInvoice} downloadFileName="referenceNum">
            </TableView>
        </>
    );
}

export default Invoice;