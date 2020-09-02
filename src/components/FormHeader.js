import React from 'react';
import { Row, Col } from 'react-bootstrap';

function FormHeader(props) {
    return (
        <Row>
            <Col>
                <h3 className={props.class}> {props.title}</h3>
            </Col>
        </Row>
    )

}

export default FormHeader;