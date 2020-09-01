import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

FormSelect.propTypes = {
    label: PropTypes.string,
    dropdDownList: PropTypes.array.isRequired
}
export default function FormSelect({ label, dropdDownList, placeholder, onChange }) {

    return (
        <>
            {dropdDownList &&
                <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                    <Form.Label>{label}</Form.Label>
                    <Col>
                        <Form.Control as="select" onChange={onChange}>
                            <option value="" key={placeholder}> {placeholder} </option>
                            {dropdDownList.map((data) =>
                                <option value={data.id} key={data} >
                                    {data.name}
                                </option>)}

                        </Form.Control>
                    </Col>
                </Form.Group>
            }
        </>
    )
}
