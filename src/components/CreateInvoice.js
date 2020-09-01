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
        customerId: "", total: 0.0, items: []
    });
    const [disabled, setDisabled] = useState(true);

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
        })
    }



    const getCustomerDetails = (e) => {
        var url = BASE_URL + REST_API.GET_CUSTOMER_BY_ID.replace('{id}', e.target.value);
        fetch(url, {
            method: 'GET'
        }).then(response => {
            console.log(response);
            if (response.status === 200 || response.status === 404)
                return response.json();
        }).then(res => {
            setCustomerDetails({
                phoneNum: res.phoneNum,
                address: res.address.addressLine1 + res.address.addressLine2 + "\n" + res.address.state + "\n"
                    + res.address.country + "-" + res.address.zipCode,
            }
            );
            setFormData({ ...formData, customerId: res.id });
        })
    }

    useEffect(() => {
        getCustNameAndId();

    }, []);

    return (
        <div className='container'>
            <PageHeading title='Create Invoice' />
            {/* <Form onSubmit={onSubmit}> */}
            <Form>
                <Row>
                    <Col md={4}>
                        <FormSelect label="Bill To:" dropdDownList={custNameAndId} placeholder="Customer Name" onChange={getCustomerDetails} />
                    </Col>

                    <Col md={{ span: 6, offset: 2 }}>
                        <FormInput name="referenceNumber" placeholder="Reference Number" value=""
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
                        <FormInput name="date" placeholder="Date" value=""
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

                <ItemDetail formData={formData} setFormData={setFormData} />
                <Row>
                    <Col>
                        <FormInput name="referenceNumber" value={formData.total}
                            required="required" size="2" offset="6" placeholder="Total (RM)"
                            labelSpan="4" labelOffset="1" labelStyle={{ textAlign: 'right' }} disabled />
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