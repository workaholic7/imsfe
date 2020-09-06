import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faShoppingCart } from '@fortawesome/free-regular-svg-icons'



export default function Count({ count, text, icon }) {
    return (
        <div>
            <Row>
                <Col md={{ span: 1 }} >
                    <FontAwesomeIcon icon={icon} size="lg" />
                </Col>
                <Col md={8}>
                    {text}
                    <br />
                    {count}

                </Col>

            </Row>

            {/* <FontAwesomeIcon icon={faShoppingCart} size="lg" /> */}
        </div>
    )
}
