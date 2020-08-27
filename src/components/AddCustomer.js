import React, { useState, useEffect } from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import { BASE_URL, REST_API } from '../Constants';
import PageHeading from './common/PageHeading';
import FormInput from './common/FormInput';

function AddCustomer() {
    const [formData, setFormData] = useState({name:"", phoneNum:"", addressLine1:"", addressLine2:"",
        state:"", country:"", zipCode:""})
    const [result, setResult] = useState('');
    const [isSuccess, setSuccess] = useState(false);
    const onFieldChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        var url = BASE_URL+REST_API.ADD_CUSTOMER;
        fetch(url,{
            method: 'POST',
            body: JSON.stringify(formData),
            headers :{
                'Content-Type':'application/json'
            }
        }).then(response => {
            console.log(response);
            if (response.status === 201 || response.status === 404)
                return response.json();
        }).then(res => {
            if (res.errorMessage === undefined) {
                setResult(res.message);
                setSuccess(true);
            } else {
                setSuccess(false);
                setResult(res.errorMessage);
            }
        });
    }
    return(
        <Container fluid>
           <Container>
                <PageHeading title='Add Customer' />
                {result !== '' ?
                    <Row>
                        <Col md={{ span: 4, offset: 4 }} style={{ 'color': isSuccess ? 'blue' : 'red', 'fontWeight': 'bold', 'marginBottom': '20px' }}>{result}
                        </Col>
                    </Row> :
                    <></>}

                <Form onSubmit={onSubmit} >
                    <FormInput size="4" name="name" placeholder="*Name" value={formData.name} onChange={onFieldChange} required/>
                    <FormInput size="4" name="phoneNum" placeholder="*Phone" value={formData.phoneNum} onChange={onFieldChange} required/>
                    <FormInput size="4" name="addressLine1" placeholder="*Address Line 1" value={formData.addressLine1} onChange={onFieldChange} required/>
                    <FormInput size="4" name="addressLine2" placeholder="Address Line 2" value={formData.addressLine2} onChange={onFieldChange} />
                    <FormInput size="4" name="state" placeholder="*State" value={formData.state} onChange={onFieldChange} required/>
                    <FormInput size="4" name="country" placeholder="*Country" value={formData.country} onChange={onFieldChange} required/>
                    <FormInput size="4" name="zipCode" placeholder="*Zip Code" value={formData.zipCode} onChange={onFieldChange} required/>
                    <FormInput size="4" name="state" placeholder="*State" value={formData.state} onChange={onFieldChange} required/>
                    <FormInput size="4" name="company" placeholder="Company (Optional)" value={formData.company} onChange={onFieldChange} />
                    {/* <Form.Group as={Row} controlId="formBasicCustomerName">
                        <Col md={4}>
                            <Form.Control type="input" name="name" placeholder="*Name" value={formData.name} onChange={onFieldChange} required />
                        </Col>
                    </Form.Group> */}

                    {/* <Form.Group as={Row} controlId="formBasicCustomerPhone">
                        <Col md={4}>
                            <Form.Control type="input" name="phoneNum" placeholder="*Phone" value={formData.phoneNum} onChange={onFieldChange}
                                required />
                        </Col>
                    </Form.Group> */}
                    
                    {/* <Form.Group as={Row} controlId="formBasicAddressLine1">
                       <Col md={4}>
                            <Form.Control type="input" name="addressLine1" placeholder="*Address Line 1" value={formData.addressLine1} onChange={onFieldChange} required />
                        </Col>
                    </Form.Group> */}

                    {/* <Form.Group as={Row} controlId="formBasicAddressLine2">
                       <Col md={4}>
                            <Form.Control type="input" name="addressLine2" placeholder="Address Line 2" value={formData.addressLine2} onChange={onFieldChange}/>
                        </Col>
                    </Form.Group> */}

                    {/* <Form.Group as={Row} controlId="formBasicState">
                       <Col md={4}>
                            <Form.Control type="input" name="state" placeholder="*State" value={formData.state} onChange={onFieldChange} required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBasicCountry">
                       <Col md={4}>
                            <Form.Control type="input" name="country" placeholder="*Country" value={formData.country} onChange={onFieldChange} required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBasicZipCode">
                       <Col md={4}>
                            <Form.Control type="input" name="zipCode" placeholder="*Zip Code" value={formData.address} onChange={onFieldChange} required />
                        </Col>
                    </Form.Group> */}

                    
                    {/* <Form.Group as={Row} controlId="formBasicCompany">
                        <Col md={4}>
                            <Form.Control type="input" name="company" placeholder="Company (Optional)" value={formData.company} onChange={onFieldChange} />
                        </Col>
                    </Form.Group> */}

                    <Row>
                        <Col md={{ span: 2, offset: 0 }} xs={12} style={{ textAlign: 'center' }}>
                            <Button variant="primary" type="submit" className="updateButton">
                                ADD
                            </Button>
                            {/* <Button variant="light" type="reset" > RESET </Button> */}
                        </Col>
                    </Row>

                </Form>
            </Container>
        </Container>
    )

}

export default AddCustomer;