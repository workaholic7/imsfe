import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

FormSelect.propTypes = {
    label: PropTypes.string,
    dropDownList: PropTypes.array.isRequired
}
export default function FormSelect({ label, dropDownList, placeholder, onChange }) {

    return (
        <>
            {dropDownList &&
                <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                    <Form.Label>{label}</Form.Label>
                    <Col>
                        <Form.Control as="select" key={label} onChange={onChange}>
                            <option value="" key={placeholder}> {placeholder} </option>
                            {dropDownList.map((data,index) =>
                                <option value={data.id} key={data+index} >
                                    {data.name}
                                </option>)}

                        </Form.Control>
                    </Col>
                </Form.Group>
            }
        </>
    )
}
