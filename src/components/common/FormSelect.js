import React, { useState, useEffect } from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import { BASE_URL, REST_API } from '../Constants';
import PageHeading from './common/PageHeading';


export default function FormSelect() {
    return(
        <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
        <Form.Label>Example select</Form.Label>
        <Col>
        <Form.Control as="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            </Form.Control>
        </Col>
        </Form.Group>
    )
}
