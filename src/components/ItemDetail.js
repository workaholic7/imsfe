import React from 'react';
import {  Form, Col, Row, Button } from 'react-bootstrap';
import FormInput from './common/FormInput';

function ItemDetail(){

    return(
        <div classname='container'>
            <div style={{textAlign: 'left', fontWeight:'bold', marginTop:'20px'}}>Item Details</div>
            <hr />
            <Form>
            <Row>  
                <Col md={4}>
                <FormInput name="address" placeholder="Address" value=""
                    onChange="onFieldChange()" required="required" size="8" 
                    label="Add Item" labelSpan="4"
                    disabled/>
                </Col>
                <Col md={2}>
                    <Button>Add</Button>
                </Col>
            </Row>

            <Row>
                <Col md={3}>
                    <FormInput name="itemDescription" placeholder="Item Description" value=""
                    onChange="onFieldChange()" required="required" size="12"/>
                </Col>

                <Col md={{span:1, offset:0}}>
                    <FormInput name="qty" placeholder="QTY" value=""
                    onChange="onFieldChange()" required="required" size="12"/>
                </Col>
           
                <Col md={{span:2, offset:0}}>
                    <FormInput name="unitPrice" placeholder="Unit Price(RM)" value=""
                    onChange="onFieldChange()" required="required" size="12"/>
                </Col>

                <Col md={{span:2, offset:0}}>
                    <FormInput name="amount" placeholder="Amount(RM)" value=""
                    onChange="onFieldChange()" required="required" size="12"/>
                </Col>
            </Row>

            {/* <Row>  
                <Col md={4}>
                    <FormInput name="address" placeholder="Address" value=""
                    onChange="onFieldChange()" required="required" size="8" offset="4"
                    disabled/>
                </Col>
            </Row>
            

            <div style={{textAlign: 'left', fontWeight:'bold', marginTop:'20px'}}>Item Details</div>
            <hr />
            <Row>  
                <Col md={4}>
                <FormInput name="address" placeholder="Address" value=""
                    onChange="onFieldChange()" required="required" size="8" 
                    label="Add Item" labelSpan="4"
                    disabled/>
                </Col>
                <Col md={2}>
                    <Button>Add</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                </Col>
            </Row> */}


            </Form>
        </div>
    );
}

export default ItemDetail;