import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import PageHeading from './common/PageHeading';
import { BASE_URL, REST_API } from '../Constants';
import FormInput from './common/FormInput';
import ItemDetail from './ItemDetail';
import { Styles } from './css/Styles'
import FormSelect from './common/FormSelect';

function CreateInvoice() {

    const [custNameAndId, setCustNameAndId] = useState([{ id: "", name: "" }]);
    const [customerDetails, setCustomerDetails] = useState({ phoneNum: "", address: "" });
    const [formData, setFormData] = useState({
        customerId: "", total: "", items: []
    });
    const [disabled, setDisabled] = useState(true);
    const [response, setResponse] = useState({ refNum: "", date: "" });

    const disableSaveButton = (currentValue) => {
        setDisabled(currentValue);
    }

    const getCustNameAndId = () => {
        var url = BASE_URL + REST_API.GET_CUSTOMER_BY_NAME;
        fetch(url, {
            method: 'GET'
        }).then(response => {
            console.log(response);
            if (response.status === 200 || response.status === 404)
                return response.json();
        }).then(res => {
            setCustNameAndId(res);
        }).catch(err => {
            console.log(err)
        });
    }



    const getCustomerDetails = (e) => {
        var url = BASE_URL + REST_API.GET_CUSTOMER_BY_ID.replace('{id}', e.target.value);
        fetch(url, {
            method: 'GET'
        }).then(response => {
            if (response.status === 200 || response.status === 404)
                return response.json();
        }).then(res => {
            setCustomerDetails({
                phoneNum: res.phoneNum,
                address: res.addressLine1 + res.addressLine2,
            }
            );
            setFormData({ ...formData, customerId: res.id });
        }).catch(err => {
            console.log(err)
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        var url = BASE_URL + REST_API.CREATE_INVOICE;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {

            if (response.status === 201)
                return response.json();
        }).then(res => {
            const responseCopy = Object.assign({}, response);
            responseCopy.refNum = res.refNum;
            responseCopy.date = res.date;
            setResponse(responseCopy);
            setDisabled(true);

        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getCustNameAndId();

    }, []);

    return (
        <div className='container'>
            <PageHeading title='Create Invoice' />
            <Form onSubmit={onSubmit}>
                <Row>
                    <Col md={4}>
                        <FormSelect label="Bill To:" dropDownList={custNameAndId} placeholder="Customer Name" onChange={getCustomerDetails} />
                    </Col>

                    <Col md={{ span: 6, offset: 2 }}>
                        <FormInput name="referenceNumber" placeholder="Reference Number" value={response.refNum}
                            required="required" size="5" label="Reference No:"
                            labelSpan="4" labelOffset="1" labelStyle={Styles.right} disabled />
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <FormInput name="PhoneNumber" placeholder="Phone Number"
                            size="8" offset="4" value={customerDetails.phoneNum}
                            disabled />
                    </Col>

                    <Col md={{ span: 6, offset: 2 }}>
                        <FormInput name="date" placeholder="Date" value={response.date}
                            required="required" size="5" label="Date:"
                            labelSpan="4" labelOffset="1" labelStyle={Styles.right} disabled />
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <FormInput name="address" placeholder="Address"
                            size="8" offset="4" value={customerDetails.address}
                            disabled />
                    </Col>
                </Row>

                <ItemDetail formData={formData} setFormData={setFormData} disableSaveButton={disableSaveButton} />
                <Row>
                    <Col>
                        <FormInput name="referenceNumber" value={formData.total}
                            required="required" size="2" offset="8" placeholder="Total (RM)"
                            labelStyle={{ textAlign: 'right' }} disabled={disabled} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button type="submit" disabled={disabled}>Save</Button>
                    </Col>
                </Row>


            </Form>
        </div>
    );
}

export default CreateInvoice;