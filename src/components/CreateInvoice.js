import React, { useState, useEffect } from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import { BASE_URL, REST_API } from '../Constants';
import PageHeading from './common/PageHeading';
import FormInput from './common/FormInput';
import ItemDetail from './ItemDetail';

function CreateInvoice(){

    return(
        <div classname='container'>
            <PageHeading title='Create Invoice' />
            {/* <Form onSubmit={onSubmit}> */}
            <Form>
            <Row>
                <Col md={4}>
                    <FormInput name="customerName" placeholder="Customer Name" value=""
                    onChange="onFieldChange()" required="required" size="8" label="Bill To:" 
                    labelSpan="3" labelOffset="1" />
                </Col>

                <Col md={{span:6, offset:2}}>
                    <FormInput name="referenceNumber" placeholder="Reference Number" value=""
                    onChange="onFieldChange()" required="required" size="5" label="Reference No:"
                    labelSpan="4" labelOffset="1" labelStyle={{textAlign:'right'}} disabled/>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <FormInput name="PhoneNumber" placeholder="Phone Number" value=""
                    onChange="onFieldChange()" required="required" size="8" offset="4"
                    disabled/>
                </Col>

                <Col md={{span:6, offset:2}}>
                    <FormInput name="date" placeholder="Date" value=""
                    onChange="onFieldChange()" required="required" size="5" label="Date:"
                    labelSpan="4" labelOffset="1" labelStyle={{textAlign:'right'}} disabled/>
                </Col>
            </Row>
            <Row>  
                <Col md={4}>
                    <FormInput name="address" placeholder="Address" value=""
                    onChange="onFieldChange()" required="required" size="8" offset="4"
                    disabled/>
                </Col>
            </Row>
                      
            <ItemDetail/>
           
            <Row>
                <Col>
                </Col>
            </Row>


            </Form>
        </div>
    );
}

export default CreateInvoice;