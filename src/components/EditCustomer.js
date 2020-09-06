import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { BASE_URL, REST_API } from '../Constants';
import { useParams } from 'react-router-dom';
import PageHeading from './common/PageHeading';
import FormInput from './common/FormInput';
import { Styles } from './css/Styles'

function EditCustomer(props) {
    const [formData, setFormData] = useState({
        name: "", phoneNum: "", addressLine1: "", addressLine2: "",
        state: "", country: "", zipCode: ""
    })
    let { id } = useParams();
    const [result, setResult] = useState('');
    const [isSuccess, setSuccess] = useState(false);
    const onFieldChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }

    const getCustomerDataById = () => {
        var url = BASE_URL + REST_API.GET_CUSTOMER_BY_ID.replace('{id}', id);
        fetch(url, {
            method: 'GET'
        }).then(response => {
            console.log(response);
            if (response.status === 200)
                return response.json();
            else{
                throw new Error();
            }
        }).then(res => {
            setFormData(res);
        }).catch(err => {
            console.log(err)
        });
    }

    useEffect(() => {
        getCustomerDataById();
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        var url = BASE_URL + REST_API.EDIT_CUSTOMER.replace("{id}", id);
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response);
            if (response.status === 200 || response.status === 404)
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
    return (
        <>
            <PageHeading title='Edit Customer' />
            {result !== '' ?
                <Row>
                    <Col md={{ span: 4, offset: 4 }} style={{ 'color': isSuccess ? 'blue' : 'red', 'fontWeight': 'bold', 'marginBottom': '20px' }}>{result}
                    </Col>
                </Row> :
                <></>}

            <Form onSubmit={onSubmit} >
                <FormInput size="4" name="name" placeholder="Name" value={formData.name} onChange={onFieldChange}
                    label="Name" labelStyle={Styles.right}
                    labelSpan="3" required />
                <FormInput size="4" name="phoneNum" placeholder="Phone" value={formData.phoneNum} onChange={onFieldChange}
                    label="Phone" labelStyle={Styles.right}
                    labelSpan="3" required />
                <FormInput size="4" name="addressLine1" placeholder="Address Line 1"
                    value={formData.addressLine1} onChange={onFieldChange}
                    label="Address Line 1" labelSpan="3" labelStyle={Styles.right} required />
                <FormInput size="4" name="addressLine2" placeholder="Address Line 2"
                    value={formData.addressLine2} onChange={onFieldChange}
                    label="Address Line 2" labelSpan="3" labelStyle={Styles.right} />
                <FormInput size="4" name="state" placeholder="State"
                    value={formData.state} onChange={onFieldChange}
                    label="State" labelStyle={Styles.right}
                    labelSpan="3" required />
                <FormInput size="4" name="country" placeholder="Country"
                    value={formData.country} onChange={onFieldChange}
                    label="Country" labelStyle={Styles.right}
                    labelSpan="3" required />
                <FormInput size="4" name="zipCode" placeholder="Zip Code"
                    value={formData.zipCode} onChange={onFieldChange}
                    label="Zip Code" labelStyle={Styles.right}
                    labelSpan="3" required />

                <FormInput size="4" name="company" placeholder="Company"
                    value={formData.company} onChange={onFieldChange}
                    label="Company (Optional)"
                    labelSpan="3" labelStyle={Styles.right} />
                <Row>
                    <Col md={{ span: 4, offset: 3 }} xs={12} style={{ textAlign: 'center' }}>
                        <Button variant="primary" type="submit" className="addButton" style={{ width: '100%' }}>
                            UPDATE
                            </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )

}

export default EditCustomer;