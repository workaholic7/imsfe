import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';

export default function FormInput({name, placeholder,value, onChange, required, 
    size, offset, label, labelSpan, labelOffset, labelStyle, disabled}){
    return (
        <Form.Group as={Row} controlId={"formBasic"+name}>
            {label?
                <Form.Label column md={{ span: labelSpan, offset: labelOffset }} style={labelStyle}>{label}</Form.Label>
        :<></>}
            <Col md={{ span: size, offset: offset }}>
                <Form.Control type="input" 
                    name={name} placeholder={placeholder} 
                    value={value} onChange={onChange} 
                    required={required} disabled={disabled}/>
            </Col>
        </Form.Group>
    )
}