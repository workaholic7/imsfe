import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faShoppingCart } from '@fortawesome/free-regular-svg-icons'



export default function Count({ count, text, icon, className}) {
    return (
            <Row className={"count-row "+className}>
                <Col md={{ span: 4 }} className="count-icon">
                    {icon}
                </Col>
                <Col md={8} className="count-text">
                    {text}
                    <br />
                    <b>{count}</b>
                </Col>
            </Row>
    )
}
